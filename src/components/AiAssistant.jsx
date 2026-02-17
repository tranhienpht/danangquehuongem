import React from 'react';
import { Bot, Sparkles } from 'lucide-react';
import './AiAssistant.css';

const AiAssistant = ({ onClick }) => {
    return (
        <div className="ai-assistant-wrapper" onClick={onClick}>
            <div className="ai-robot-container">
                <div className="robot-head">
                    <Bot size={28} className="robot-face" strokeWidth={2.5} />
                    <div className="robot-antenna"></div>
                </div>
                <div className="robot-body">
                    <div className="robot-core"></div>
                </div>
                <div className="robot-sparkles">
                    <Sparkles size={24} />
                </div>
            </div>
            <div className="ai-tooltip">
                Chat với tớ nhé!
            </div>
        </div>
    );
};

export default AiAssistant;
