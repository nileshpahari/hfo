import google.generativeai as genai
import json
import logging
from typing import Dict, List, Optional, Tuple
from datetime import datetime, timedelta
import re
import math

logger = logging.getLogger(__name__)

class TaskPrioritizer:
    def __init__(self, gemini_model=None):
        self.gemini_model = gemini_model
        
    def prioritize_tasks(self, tasks: List[Dict], context: Dict = None) -> List[Dict]:
        """
        Prioritize tasks using AI analysis and multiple ranking factors
        
        Args:
            tasks: List of task dictionaries with keys: task, assignee, status, due, etc.
            context: Additional context like meeting sentiment, team workload, etc.
        
        Returns:
            List of tasks with priority scores and rankings
        """
        if not tasks:
            return []
        
        # Add AI-powered priority analysis
        ai_priorities = self._get_ai_task_priorities(tasks, context)
        
        # Calculate multiple priority factors
        for i, task in enumerate(tasks):
            task_analysis = ai_priorities.get(i, {})
            
            # Base priority factors
            urgency_score = self._calculate_urgency_score(task)
            importance_score = self._calculate_importance_score(task, task_analysis)
            complexity_score = self._calculate_complexity_score(task, task_analysis)
            dependency_score = self._calculate_dependency_score(task, tasks)
            
            # AI-enhanced factors
            ai_priority_score = task_analysis.get('priority_score', 0.5)
            business_impact_score = task_analysis.get('business_impact', 0.5)
            effort_estimate = task_analysis.get('effort_estimate', 'medium')
            
            # Calculate composite priority score
            priority_score = self._calculate_composite_priority(
                urgency_score, importance_score, complexity_score, 
                dependency_score, ai_priority_score, business_impact_score
            )
            
            # Add priority data to task
            task.update({
                'priority_score': round(priority_score, 3),
                'priority_level': self._get_priority_level(priority_score),
                'urgency_score': urgency_score,
                'importance_score': importance_score,
                'complexity_score': complexity_score,
                'ai_analysis': task_analysis,
                'effort_estimate': effort_estimate,
                'recommended_assignee': task_analysis.get('recommended_assignee'),
                'priority_reasoning': task_analysis.get('reasoning', 'Standard priority calculation')
            })
        
        # Sort by priority score (highest first)
        prioritized_tasks = sorted(tasks, key=lambda x: x['priority_score'], reverse=True)
        
        # Add ranking
        for i, task in enumerate(prioritized_tasks):
            task['priority_rank'] = i + 1
        
        return prioritized_tasks
    
    def _get_ai_task_priorities(self, tasks: List[Dict], context: Dict = None) -> Dict:
        """
        Use Gemini AI to analyze task priorities with context
        """
        if not self.gemini_model or not tasks:
            return {}
        
        try:
            # Prepare context information
            context_info = ""
            if context:
                context_info = f"""
                Additional Context:
                - Meeting sentiment: {context.get('sentiment', 'neutral')}
                - Team workload: {context.get('team_workload', 'normal')}
                - Current sprint: {context.get('current_sprint', 'unknown')}
                - Deadlines approaching: {context.get('upcoming_deadlines', [])}
                """
            
            # Format tasks for AI analysis
            tasks_text = ""
            for i, task in enumerate(tasks):
                tasks_text += f"""
                Task {i}:
                - Description: {task.get('task', 'No description')}
                - Assignee: {task.get('assignee', 'Unassigned')}
                - Status: {task.get('status', 'Unknown')}
                - Due date: {task.get('due', 'No due date')}
                """
            
            prompt = f"""
            Analyze these tasks and provide priority recommendations based on business impact, urgency, complexity, and dependencies.
            
            {tasks_text}
            
            {context_info}
            
            For each task, provide analysis in this JSON format:
            {{
                "0": {{
                    "priority_score": 0.85,
                    "business_impact": 0.9,
                    "effort_estimate": "high|medium|low",
                    "recommended_assignee": "suggested_person_or_null",
                    "dependencies": ["task_indices_this_depends_on"],
                    "reasoning": "Brief explanation of priority reasoning",
                    "urgency_factors": ["factor1", "factor2"],
                    "risk_level": "high|medium|low"
                }},
                "1": {{ ... }}
            }}
            
            Rules:
            1. priority_score: 0.0 (lowest) to 1.0 (highest priority)
            2. business_impact: 0.0 (no impact) to 1.0 (critical impact)
            3. Consider deadlines, dependencies, team capacity, and strategic importance
            4. effort_estimate: high (>1 week), medium (1-3 days), low (<1 day)
            5. Identify blockers and dependencies between tasks
            6. Output ONLY valid JSON
            """
            
            response = self.gemini_model.generate_content(prompt)
            result_text = response.text.strip()
            
            # Clean up response
            result_text = re.sub(r"```(?:json)?", "", result_text, flags=re.IGNORECASE).strip()
            
            try:
                ai_analysis = json.loads(result_text)
                return ai_analysis
            except json.JSONDecodeError as e:
                logger.error(f"Failed to parse AI priority response: {e}")
                return {}
                
        except Exception as e:
            logger.error(f"Error in AI task prioritization: {e}")
            return {}
    
    def _calculate_urgency_score(self, task: Dict) -> float:
        """
        Calculate urgency based on due date and current date
        """
        due_date_str = task.get('due')
        if not due_date_str:
            return 0.3  # Default low urgency for tasks without due dates
        
        try:
            due_date = datetime.strptime(due_date_str, '%Y-%m-%d')
            now = datetime.now()
            days_until_due = (due_date - now).days
            
            if days_until_due < 0:
                return 1.0  # Overdue - highest urgency
            elif days_until_due == 0:
                return 0.95  # Due today
            elif days_until_due == 1:
                return 0.9   # Due tomorrow
            elif days_until_due <= 3:
                return 0.8   # Due within 3 days
            elif days_until_due <= 7:
                return 0.6   # Due within a week
            elif days_until_due <= 14:
                return 0.4   # Due within 2 weeks
            else:
                return 0.2   # Due later
                
        except ValueError:
            return 0.3  # Invalid date format
    
    def _calculate_importance_score(self, task: Dict, ai_analysis: Dict) -> float:
        """
        Calculate importance based on task content and AI analysis
        """
        # Start with AI business impact if available
        base_score = ai_analysis.get('business_impact', 0.5)
        
        # Analyze task description for importance keywords
        task_text = task.get('task', '').lower()
        
        high_importance_keywords = [
            'critical', 'urgent', 'blocker', 'security', 'bug', 'fix', 'production',
            'client', 'customer', 'revenue', 'launch', 'release', 'deadline'
        ]
        
        medium_importance_keywords = [
            'feature', 'enhancement', 'improvement', 'optimization', 'refactor',
            'documentation', 'testing', 'review'
        ]
        
        low_importance_keywords = [
            'cleanup', 'minor', 'nice to have', 'future', 'research', 'investigate'
        ]
        
        # Adjust score based on keywords
        for keyword in high_importance_keywords:
            if keyword in task_text:
                base_score = min(1.0, base_score + 0.2)
        
        for keyword in medium_importance_keywords:
            if keyword in task_text:
                base_score = min(1.0, base_score + 0.1)
        
        for keyword in low_importance_keywords:
            if keyword in task_text:
                base_score = max(0.0, base_score - 0.1)
        
        return base_score
    
    def _calculate_complexity_score(self, task: Dict, ai_analysis: Dict) -> float:
        """
        Calculate complexity score (higher complexity = lower priority for quick wins)
        """
        effort_estimate = ai_analysis.get('effort_estimate', 'medium')
        
        complexity_map = {
            'low': 0.2,     # Quick wins - higher priority
            'medium': 0.5,  # Moderate complexity
            'high': 0.8     # Complex tasks - lower priority unless critical
        }
        
        return complexity_map.get(effort_estimate, 0.5)
    
    def _calculate_dependency_score(self, task: Dict, all_tasks: List[Dict]) -> float:
        """
        Calculate dependency score based on blocking other tasks
        """
        # Simple heuristic: tasks that others depend on get higher priority
        task_description = task.get('task', '').lower()
        
        # Count how many other tasks might depend on this one
        dependency_count = 0
        for other_task in all_tasks:
            if other_task == task:
                continue
            
            other_description = other_task.get('task', '').lower()
            
            # Simple keyword matching for dependencies
            if any(word in other_description for word in task_description.split()[:3]):
                dependency_count += 1
        
        # Normalize dependency score
        max_dependencies = len(all_tasks) - 1
        if max_dependencies > 0:
            return dependency_count / max_dependencies
        
        return 0.0
    
    def _calculate_composite_priority(self, urgency: float, importance: float, 
                                    complexity: float, dependency: float,
                                    ai_priority: float, business_impact: float) -> float:
        """
        Calculate composite priority score using weighted factors
        """
        # Weights for different factors
        weights = {
            'urgency': 0.25,
            'importance': 0.25,
            'business_impact': 0.20,
            'ai_priority': 0.15,
            'dependency': 0.10,
            'complexity': 0.05  # Lower weight, inverted (lower complexity = higher priority)
        }
        
        # Invert complexity score (lower complexity should increase priority)
        complexity_adjusted = 1.0 - complexity
        
        composite_score = (
            urgency * weights['urgency'] +
            importance * weights['importance'] +
            business_impact * weights['business_impact'] +
            ai_priority * weights['ai_priority'] +
            dependency * weights['dependency'] +
            complexity_adjusted * weights['complexity']
        )
        
        return min(1.0, max(0.0, composite_score))
    
    def _get_priority_level(self, score: float) -> str:
        """
        Convert priority score to human-readable level
        """
        if score >= 0.8:
            return 'Critical'
        elif score >= 0.6:
            return 'High'
        elif score >= 0.4:
            return 'Medium'
        elif score >= 0.2:
            return 'Low'
        else:
            return 'Minimal'
    
    def get_priority_recommendations(self, prioritized_tasks: List[Dict]) -> Dict:
        """
        Generate recommendations based on prioritized tasks
        """
        if not prioritized_tasks:
            return {"recommendations": [], "insights": []}
        
        recommendations = []
        insights = []
        
        # Analyze task distribution
        critical_tasks = [t for t in prioritized_tasks if t.get('priority_level') == 'Critical']
        high_tasks = [t for t in prioritized_tasks if t.get('priority_level') == 'High']
        overdue_tasks = [t for t in prioritized_tasks if t.get('urgency_score', 0) >= 1.0]
        
        # Generate recommendations
        if critical_tasks:
            recommendations.append(f"Focus on {len(critical_tasks)} critical tasks first")
        
        if overdue_tasks:
            recommendations.append(f"Address {len(overdue_tasks)} overdue tasks immediately")
        
        if len(high_tasks) > 5:
            recommendations.append("Consider breaking down high-priority tasks into smaller chunks")
        
        # Generate insights
        avg_priority = sum(t.get('priority_score', 0) for t in prioritized_tasks) / len(prioritized_tasks)
        insights.append(f"Average task priority: {avg_priority:.2f}")
        
        if avg_priority > 0.7:
            insights.append("High overall task urgency - consider additional resources")
        elif avg_priority < 0.3:
            insights.append("Low overall task urgency - good time for strategic work")
        
        return {
            "recommendations": recommendations,
            "insights": insights,
            "task_distribution": {
                "critical": len(critical_tasks),
                "high": len(high_tasks),
                "overdue": len(overdue_tasks),
                "total": len(prioritized_tasks)
            }
        }
