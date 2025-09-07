class MeetingDashboard {
    constructor() {
        this.isRecording = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.startTime = null;
        this.wordCount = 0;
        this.actionItems = [];
        this.participants = new Map();
        this.sentimentHistory = [];
        
        this.FLASK_BACKEND_URL = null; // will be detected dynamically
        
        this.initializeElements();
        this.setupEventListeners();
        this.startDashboardUpdates();
    }

    async getBackendBase() {
        if (this.FLASK_BACKEND_URL) return this.FLASK_BACKEND_URL;
        const cached = localStorage.getItem('backendBaseUrl');
        if (cached) {
            this.FLASK_BACKEND_URL = cached;
            return this.FLASK_BACKEND_URL;
        }
        const candidates = [
            'http://127.0.0.1:5000',
            'http://localhost:5000'
        ];
        for (const base of candidates) {
            try {
                const res = await fetch(`${base}/health`, { method: 'GET' });
                if (res.ok) {
                    this.FLASK_BACKEND_URL = base;
                    localStorage.setItem('backendBaseUrl', base);
                    return base;
                }
            } catch (e) {
                // try next
            }
        }
        // Fallback
        this.FLASK_BACKEND_URL = candidates[1];
        return this.FLASK_BACKEND_URL;
    }

    initializeElements() {
        this.recordBtn = document.getElementById('recordBtn');
        this.meetingTitle = document.getElementById('meetingTitle');
        this.meetingStatus = document.getElementById('meetingStatus');
        this.transcriptionContent = document.getElementById('transcriptionContent');
        this.waveform = document.getElementById('waveform');
        this.meetingDuration = document.getElementById('meetingDuration');
        this.wordCountEl = document.getElementById('wordCount');
        this.sentimentScore = document.getElementById('sentimentScore');
        this.actionItemsCount = document.getElementById('actionItemsCount');
        this.participantsList = document.getElementById('participantsList');
        this.actionItemsLive = document.getElementById('actionItemsLive');
        this.engagementBar = document.getElementById('engagementBar');
        this.speakingDistribution = document.getElementById('speakingDistribution');
    }

    setupEventListeners() {
        this.recordBtn.addEventListener('click', () => this.toggleRecording());
        
        // Voice commands
        if ('webkitSpeechRecognition' in window) {
            this.setupVoiceCommands();
        }
    }

    setupVoiceCommands() {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');

            // Check for voice commands
            if (transcript.toLowerCase().includes('hey nullpointer')) {
                if (transcript.toLowerCase().includes('start recording')) {
                    if (!this.isRecording) this.toggleRecording();
                } else if (transcript.toLowerCase().includes('stop recording')) {
                    if (this.isRecording) this.toggleRecording();
                }
            }

            this.updateLiveTranscription(transcript);
        };

        recognition.start();
    }

    async toggleRecording() {
        if (!this.isRecording) {
            await this.startRecording();
        } else {
            this.stopRecording();
        }
    }

    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            this.mediaRecorder = new MediaRecorder(stream);
            this.audioChunks = [];
            this.startTime = Date.now();
            
            this.mediaRecorder.ondataavailable = event => {
                this.audioChunks.push(event.data);
            };
            
            this.mediaRecorder.onstop = () => {
                const audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
                this.processAudio(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };
            
            this.mediaRecorder.start();
            this.isRecording = true;
            this.updateRecordingUI(true);
            
        } catch (error) {
            console.error('Error starting recording:', error);
            this.showNotification('Microphone access denied', 'error');
        }
    }

    stopRecording() {
        if (this.mediaRecorder) {
            this.mediaRecorder.stop();
            this.isRecording = false;
            this.updateRecordingUI(false);
        }
    }

    updateRecordingUI(recording) {
        if (recording) {
            this.recordBtn.classList.add('recording');
            this.recordBtn.querySelector('span').textContent = 'Stop Recording';
            this.meetingStatus.textContent = 'Recording in progress...';
            this.waveform.style.display = 'flex';
        } else {
            this.recordBtn.classList.remove('recording');
            this.recordBtn.querySelector('span').textContent = 'Start Recording';
            this.meetingStatus.textContent = 'Processing audio...';
            this.waveform.style.display = 'none';
        }
    }

    updateLiveTranscription(text) {
        const sentiment = this.analyzeSentiment(text);
        const timestamp = new Date().toLocaleTimeString();
        
        const segment = document.createElement('div');
        segment.className = 'speaker-segment';
        segment.innerHTML = `
            <div class="speaker-name">
                You 
                <span class="sentiment-indicator sentiment-${sentiment}"></span>
                <small style="opacity: 0.6;">${timestamp}</small>
            </div>
            <div>${text}</div>
        `;
        
        this.transcriptionContent.appendChild(segment);
        this.transcriptionContent.scrollTop = this.transcriptionContent.scrollHeight;
        
        // Update word count
        this.wordCount += text.split(' ').length;
        this.wordCountEl.textContent = this.wordCount;
        
        // Detect action items
        this.detectActionItems(text);
        
        // Update sentiment
        this.updateSentiment(sentiment);
    }

    analyzeSentiment(text) {
        // Simple sentiment analysis - in production, use a proper AI service
        const positiveWords = ['great', 'excellent', 'good', 'amazing', 'perfect', 'love', 'awesome'];
        const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'horrible', 'worst', 'problem'];
        
        const words = text.toLowerCase().split(' ');
        let score = 0;
        
        words.forEach(word => {
            if (positiveWords.includes(word)) score++;
            if (negativeWords.includes(word)) score--;
        });
        
        if (score > 0) return 'positive';
        if (score < 0) return 'negative';
        return 'neutral';
    }

    detectActionItems(text) {
        // Simple action item detection
        const actionPatterns = [
            /(?:need to|should|must|will|going to|action item|todo|task)\s+(.+?)(?:\.|$)/gi,
            /(?:assign|assigned to|responsible for)\s+(.+?)(?:\.|$)/gi
        ];
        
        actionPatterns.forEach(pattern => {
            const matches = text.match(pattern);
            if (matches) {
                matches.forEach(match => {
                    this.addActionItem(match.trim());
                });
            }
        });
    }

    addActionItem(item) {
        this.actionItems.push({
            text: item,
            timestamp: new Date().toLocaleTimeString(),
            assignee: 'Unassigned'
        });
        
        this.updateActionItemsDisplay();
        this.actionItemsCount.textContent = this.actionItems.length;
    }

    updateActionItemsDisplay() {
        this.actionItemsLive.innerHTML = '';
        
        this.actionItems.slice(-5).forEach(item => {
            const actionDiv = document.createElement('div');
            actionDiv.className = 'action-item';
            actionDiv.innerHTML = `
                <div style="font-size: 12px; opacity: 0.8;">${item.timestamp}</div>
                <div>${item.text}</div>
                <div style="font-size: 11px; color: #667eea;">Assignee: ${item.assignee}</div>
            `;
            this.actionItemsLive.appendChild(actionDiv);
        });
    }

    updateSentiment(sentiment) {
        this.sentimentHistory.push(sentiment);
        
        // Calculate overall sentiment
        const recent = this.sentimentHistory.slice(-10);
        const positive = recent.filter(s => s === 'positive').length;
        const negative = recent.filter(s => s === 'negative').length;
        
        let emoji = '😐';
        if (positive > negative + 2) emoji = '😊';
        else if (negative > positive + 2) emoji = '😟';
        
        this.sentimentScore.textContent = emoji;
    }

    async processAudio(audioBlob) {
        const formData = new FormData();
        formData.append("file", audioBlob, "meeting_audio.wav");
        formData.append("meetingTitle", this.meetingTitle.value || "Live Meeting");
        formData.append("slackEnabled", "true");
        formData.append("notionEnabled", "true");
        
        try {
            const base = await this.getBackendBase();
            const response = await fetch(`${base}/transcribe`, {
                method: "POST",
                body: formData,
            });
            
            const data = await response.json();
            
            if (data.summary && data.summary.formatted_text) {
                this.showNotification('Meeting processed successfully!', 'success');
                // Add final summary to transcription
                this.addSummaryToTranscription(data.summary.formatted_text);
            }
            
        } catch (error) {
            console.error('Error processing audio:', error);
            this.showNotification('Error processing audio', 'error');
        }
    }

    addSummaryToTranscription(summary) {
        const summaryDiv = document.createElement('div');
        summaryDiv.style.cssText = `
            background: rgba(102, 126, 234, 0.2);
            border: 1px solid #667eea;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
        `;
        summaryDiv.innerHTML = `
            <h4 style="color: #667eea; margin-bottom: 10px;">
                <i class="fas fa-brain"></i> AI Summary
            </h4>
            <div>${summary.replace(/\n/g, '<br>')}</div>
        `;
        
        this.transcriptionContent.appendChild(summaryDiv);
        this.transcriptionContent.scrollTop = this.transcriptionContent.scrollHeight;
    }

    startDashboardUpdates() {
        setInterval(() => {
            this.updateMeetingDuration();
            this.updateEngagementMetrics();
        }, 1000);
    }

    updateMeetingDuration() {
        if (this.startTime) {
            const duration = Date.now() - this.startTime;
            const minutes = Math.floor(duration / 60000);
            const seconds = Math.floor((duration % 60000) / 1000);
            this.meetingDuration.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    updateEngagementMetrics() {
        // Simulate engagement based on word count and sentiment
        const engagement = Math.min(100, (this.wordCount / 10) + (this.sentimentHistory.filter(s => s === 'positive').length * 5));
        this.engagementBar.style.width = `${engagement}%`;
        
        // Update speaking distribution
        if (this.wordCount > 0) {
            this.speakingDistribution.textContent = `You: ${this.wordCount} words`;
        }
    }

    showNotification(message, type = 'info') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(400px);
            transition: transform 0.3s;
            ${type === 'success' ? 'background: #28a745;' : 'background: #dc3545;'}
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => toast.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    new MeetingDashboard();
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        // Toggle recording with Ctrl+R
        document.getElementById('recordBtn').click();
    }
});
