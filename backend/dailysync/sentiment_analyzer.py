import google.generativeai as genai
import json
import logging
from typing import Dict, List, Optional
import re
from datetime import datetime

logger = logging.getLogger(__name__)

class SentimentAnalyzer:
    def __init__(self, gemini_model=None):
        self.gemini_model = gemini_model
        
    def analyze_meeting_sentiment(self, transcript: str) -> Dict:
        """
        Analyze sentiment of entire meeting transcript
        Returns detailed sentiment analysis with emotions, engagement, and insights
        """
        if not self.gemini_model:
            return self._fallback_sentiment_analysis(transcript)
            
        try:
            prompt = f"""
            Analyze the sentiment and emotional tone of this meeting transcript. Provide a detailed analysis in JSON format.

            Transcript:
            {transcript}

            Required JSON format:
            {{
                "overall_sentiment": "positive|neutral|negative",
                "sentiment_score": 0.0,
                "emotions_detected": ["emotion1", "emotion2"],
                "engagement_level": "high|medium|low",
                "engagement_score": 0.0,
                "key_moments": [
                    {{
                        "timestamp": "estimated_time",
                        "text": "relevant_quote",
                        "sentiment": "positive|neutral|negative",
                        "emotion": "specific_emotion"
                    }}
                ],
                "speaker_analysis": [
                    {{
                        "speaker": "speaker_name",
                        "sentiment": "positive|neutral|negative",
                        "engagement": "high|medium|low",
                        "dominant_emotions": ["emotion1", "emotion2"]
                    }}
                ],
                "meeting_insights": {{
                    "productivity_indicators": ["indicator1", "indicator2"],
                    "potential_issues": ["issue1", "issue2"],
                    "positive_highlights": ["highlight1", "highlight2"],
                    "recommendations": ["recommendation1", "recommendation2"]
                }}
            }}

            Rules:
            1. sentiment_score: -1.0 (very negative) to 1.0 (very positive)
            2. engagement_score: 0.0 (no engagement) to 1.0 (highly engaged)
            3. Identify specific emotions: excited, frustrated, confused, confident, concerned, etc.
            4. Extract 3-5 key emotional moments from the meeting
            5. Provide actionable insights and recommendations
            6. Output ONLY valid JSON
            """
            
            response = self.gemini_model.generate_content(prompt)
            result_text = response.text.strip()
            
            # Clean up response
            result_text = re.sub(r"```(?:json)?", "", result_text, flags=re.IGNORECASE).strip()
            
            try:
                sentiment_data = json.loads(result_text)
                return self._validate_sentiment_data(sentiment_data)
            except json.JSONDecodeError as e:
                logger.error(f"Failed to parse Gemini sentiment response: {e}")
                return self._fallback_sentiment_analysis(transcript)
                
        except Exception as e:
            logger.error(f"Error in Gemini sentiment analysis: {e}")
            return self._fallback_sentiment_analysis(transcript)
    
    def analyze_real_time_sentiment(self, text_chunk: str) -> Dict:
        """
        Quick sentiment analysis for real-time transcription
        """
        if not text_chunk.strip():
            return {"sentiment": "neutral", "confidence": 0.0, "emotions": []}
            
        # Simple real-time analysis for immediate feedback
        positive_words = [
            'great', 'excellent', 'good', 'amazing', 'perfect', 'love', 'awesome',
            'fantastic', 'wonderful', 'brilliant', 'outstanding', 'superb', 'excited',
            'happy', 'pleased', 'satisfied', 'agree', 'yes', 'absolutely', 'definitely'
        ]
        
        negative_words = [
            'bad', 'terrible', 'awful', 'hate', 'horrible', 'worst', 'problem',
            'issue', 'concern', 'worried', 'frustrated', 'angry', 'disappointed',
            'disagree', 'no', 'never', 'impossible', 'difficult', 'challenging'
        ]
        
        neutral_words = [
            'okay', 'fine', 'maybe', 'perhaps', 'possibly', 'might', 'could',
            'should', 'would', 'think', 'consider', 'discuss', 'review'
        ]
        
        words = text_chunk.lower().split()
        positive_count = sum(1 for word in words if word in positive_words)
        negative_count = sum(1 for word in words if word in negative_words)
        neutral_count = sum(1 for word in words if word in neutral_words)
        
        total_sentiment_words = positive_count + negative_count + neutral_count
        
        if total_sentiment_words == 0:
            return {"sentiment": "neutral", "confidence": 0.0, "emotions": []}
        
        # Calculate sentiment
        sentiment_score = (positive_count - negative_count) / len(words)
        confidence = total_sentiment_words / len(words)
        
        if sentiment_score > 0.1:
            sentiment = "positive"
            emotions = ["optimistic", "engaged"] if sentiment_score > 0.2 else ["positive"]
        elif sentiment_score < -0.1:
            sentiment = "negative"
            emotions = ["concerned", "frustrated"] if sentiment_score < -0.2 else ["negative"]
        else:
            sentiment = "neutral"
            emotions = ["neutral", "thoughtful"]
        
        return {
            "sentiment": sentiment,
            "confidence": min(confidence, 1.0),
            "emotions": emotions,
            "score": sentiment_score
        }
    
    def _fallback_sentiment_analysis(self, transcript: str) -> Dict:
        """
        Fallback sentiment analysis when Gemini is not available
        """
        words = transcript.lower().split()
        
        # Enhanced word lists
        sentiment_words = {
            'positive': [
                'great', 'excellent', 'good', 'amazing', 'perfect', 'love', 'awesome',
                'fantastic', 'wonderful', 'brilliant', 'outstanding', 'superb', 'excited',
                'happy', 'pleased', 'satisfied', 'successful', 'effective', 'productive'
            ],
            'negative': [
                'bad', 'terrible', 'awful', 'hate', 'horrible', 'worst', 'problem',
                'issue', 'concern', 'worried', 'frustrated', 'angry', 'disappointed',
                'failed', 'ineffective', 'unproductive', 'blocked', 'stuck'
            ]
        }
        
        positive_count = sum(1 for word in words if word in sentiment_words['positive'])
        negative_count = sum(1 for word in words if word in sentiment_words['negative'])
        
        total_words = len(words)
        sentiment_score = (positive_count - negative_count) / max(total_words, 1)
        
        if sentiment_score > 0.05:
            overall_sentiment = "positive"
            engagement_level = "high" if sentiment_score > 0.1 else "medium"
        elif sentiment_score < -0.05:
            overall_sentiment = "negative"
            engagement_level = "low" if sentiment_score < -0.1 else "medium"
        else:
            overall_sentiment = "neutral"
            engagement_level = "medium"
        
        return {
            "overall_sentiment": overall_sentiment,
            "sentiment_score": sentiment_score,
            "emotions_detected": [overall_sentiment],
            "engagement_level": engagement_level,
            "engagement_score": max(0.0, min(1.0, 0.5 + sentiment_score)),
            "key_moments": [],
            "speaker_analysis": [],
            "meeting_insights": {
                "productivity_indicators": ["Basic sentiment analysis completed"],
                "potential_issues": ["Limited analysis - Gemini AI not available"],
                "positive_highlights": [],
                "recommendations": ["Enable Gemini AI for detailed sentiment analysis"]
            }
        }
    
    def _validate_sentiment_data(self, data: Dict) -> Dict:
        """
        Validate and sanitize sentiment analysis data
        """
        # Ensure required fields exist with defaults
        validated = {
            "overall_sentiment": data.get("overall_sentiment", "neutral"),
            "sentiment_score": max(-1.0, min(1.0, data.get("sentiment_score", 0.0))),
            "emotions_detected": data.get("emotions_detected", []),
            "engagement_level": data.get("engagement_level", "medium"),
            "engagement_score": max(0.0, min(1.0, data.get("engagement_score", 0.5))),
            "key_moments": data.get("key_moments", []),
            "speaker_analysis": data.get("speaker_analysis", []),
            "meeting_insights": data.get("meeting_insights", {
                "productivity_indicators": [],
                "potential_issues": [],
                "positive_highlights": [],
                "recommendations": []
            })
        }
        
        # Validate sentiment values
        if validated["overall_sentiment"] not in ["positive", "neutral", "negative"]:
            validated["overall_sentiment"] = "neutral"
            
        if validated["engagement_level"] not in ["high", "medium", "low"]:
            validated["engagement_level"] = "medium"
        
        return validated

    def get_sentiment_trends(self, sentiment_history: List[Dict]) -> Dict:
        """
        Analyze sentiment trends over time
        """
        if not sentiment_history:
            return {"trend": "stable", "direction": "neutral", "volatility": 0.0}
        
        scores = [s.get("sentiment_score", 0.0) for s in sentiment_history]
        
        if len(scores) < 2:
            return {"trend": "stable", "direction": "neutral", "volatility": 0.0}
        
        # Calculate trend
        recent_avg = sum(scores[-3:]) / len(scores[-3:])
        earlier_avg = sum(scores[:-3]) / len(scores[:-3]) if len(scores) > 3 else scores[0]
        
        trend_direction = recent_avg - earlier_avg
        
        if trend_direction > 0.1:
            trend = "improving"
            direction = "positive"
        elif trend_direction < -0.1:
            trend = "declining"
            direction = "negative"
        else:
            trend = "stable"
            direction = "neutral"
        
        # Calculate volatility
        if len(scores) > 1:
            volatility = sum(abs(scores[i] - scores[i-1]) for i in range(1, len(scores))) / (len(scores) - 1)
        else:
            volatility = 0.0
        
        return {
            "trend": trend,
            "direction": direction,
            "volatility": volatility,
            "recent_average": recent_avg,
            "overall_average": sum(scores) / len(scores)
        }
