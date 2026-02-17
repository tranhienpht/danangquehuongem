import React, { useState, useRef, useEffect } from 'react';
import { X, Send, User, Bot, Sparkles, Globe, ExternalLink, MessageSquare } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import AiAssistant from './AiAssistant';
import { festivalsData } from '../data/festivalsData';
import { timelineEvents, historicalFigures } from '../data/historyData';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Chào bạn! Mình là trợ lý thông minh Đà Nẵng. Bạn muốn tìm hiểu gì về thành phố mình nào?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen, isTyping]);

    // Prepare context data
    const getContextData = () => {
        let context = "Dữ liệu về Đà Nẵng:\n\n";

        // Add Festivals
        context += "Lễ hội:\n";
        if (festivalsData.national) {
            festivalsData.national.forEach(f => context += `- ${f.name}: ${f.description}\n`);
        }
        if (festivalsData.provincial) {
            festivalsData.provincial.forEach(f => context += `- ${f.name}: ${f.description}\n`);
        }

        // Add History
        context += "\nLịch sử:\n";
        if (timelineEvents) {
            timelineEvents.forEach(e => context += `- Năm ${e.year}: ${e.event}\n`);
        }

        // Add Figures
        context += "\nNhân vật lịch sử:\n";
        if (historicalFigures) {
            historicalFigures.forEach(p => context += `- ${p.name}: ${p.description}\n`);
        }

        return context;
    };

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMsg = input;
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        try {
            const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
            if (!apiKey) {
                throw new Error("Missing API Key");
            }

            // Using @google/generative-ai SDK
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
                systemInstruction: `Bạn là 'Trợ lý Đà Nẵng', bạn đồng hành lớp 4. Thân thiện, dễ hiểu, vui vẻ. \n\nĐây là dữ liệu bạn biết về Đà Nẵng:\n${getContextData()}\n\nHãy trả lời dựa trên dữ liệu này. Nếu không có trong dữ liệu, bạn có thể dùng kiến thức chung nhưng hãy nói giọng điệu thân thiện với học sinh tiểu học.`,
            });

            const result = await model.generateContent(userMsg);
            const response = await result.response;
            const text = response.text() || "Xin lỗi em, tớ gặp chút lỗi. Em thử lại nhé!";

            setMessages(prev => [...prev, { sender: 'bot', text }]);
        } catch (error) {
            console.error("Chat Error:", error);
            let errorText = "Lỗi kết nối rồi em ơi!";
            if (error.message && error.message.includes("Missing API Key")) {
                errorText = "Chưa có cấu hình API Key em ơi. Nhờ thầy cô kiểm tra giúp nhé!";
            } else if (error.message && (error.message.includes("404") || error.message.includes("not found"))) {
                errorText = `Không tìm thấy mô hình AI. Lỗi: ${error.message}`;
            } else {
                errorText = `Lỗi kết nối: ${error.message || "Không xác định"}. Em thử lại sau nhé!`;
            }
            setMessages(prev => [...prev, { sender: 'bot', text: errorText }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {!isOpen && <AiAssistant onClick={() => setIsOpen(true)} />}

            {isOpen && (
                <div className="chatbot-window">
                    {/* Header */}
                    <div className="chatbot-header">
                        <div className="header-decoration">
                            <Sparkles size={60} className="header-sparkle" />
                        </div>
                        <div className="header-content">
                            <div className="bot-avatar">
                                <div className="avatar-icon">
                                    <Bot size={24} color="#FFD700" />
                                </div>
                                <div className="status-dot"></div>
                            </div>
                            <div className="bot-info">
                                <span className="bot-name">Trợ Lý Đà Nẵng</span>
                                <span className="bot-role">Hệ thống AI Lớp 4</span>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="close-button">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="chatbot-messages">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}>
                                <div className={`message-avatar ${msg.sender === 'user' ? 'user-avatar' : 'bot-avatar-small'}`}>
                                    {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
                                </div>
                                <div className="message-bubble-container">
                                    <div className={`message-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message-row bot-row">
                                <div className="message-avatar bot-avatar-small">
                                    <Bot size={18} />
                                </div>
                                <div className="message-bubble bot-bubble typing-bubble">
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="chatbot-input-area">
                        <div className="input-wrapper">
                            <input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && handleSend()}
                                placeholder="Hỏi tớ về quê hương mình nào..."
                                className="chat-input"
                                disabled={isTyping}
                            />
                            <button
                                onClick={handleSend}
                                disabled={isTyping}
                                className={`send-button ${isTyping ? 'disabled' : ''}`}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <p className="powered-by">Hệ thống được bảo trợ bởi Gemini AI</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
