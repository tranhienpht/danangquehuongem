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
        { sender: 'bot', text: 'Chào em! Tớ là Trợ lý Đà Nẵng, bạn đồng hành của em đây. Tớ sẵn sàng hướng dẫn và trả lời nhanh mọi câu hỏi về quê hương mình, em muốn tìm hiểu gì nào?' }
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

            // Just use a single reliable model
            const modelName = "gemini-1.5-flash";

            const model = genAI.getGenerativeModel({
                model: modelName,
                systemInstruction: `Bạn là 'Trợ lý Đà Nẵng', người bạn đồng hành của học sinh lớp 4.\n\nQUY TẮC TRẢ LỜI:\n1. Ngắn gọn, súc tích: Giới hạn trong 1-2 câu ngắn, đi thẳng vào vấn đề.\n2. Ngôn ngữ vui vẻ, thân thiện (xưng 'tớ' và 'em'), dễ hiểu với học sinh tiểu học.\n3. Ưu tiên dùng 'Dữ liệu về Đà Nẵng' dưới đây. Đặc biệt lưu ý việc từ 1/7/2025 sáp nhập tỉnh Quảng Nam vào thành phố Đà Nẵng.\n\nDữ liệu về Đà Nẵng:\n${getContextData()}\n\nNếu không có thông tin, hãy dùng kiến thức chung nhưng phải cực kỳ ngắn gọn và cùng giọng điệu này.`,
            });

            const result = await model.generateContent(userMsg);
            const response = await result.response;
            const text = response.text() || "Xin lỗi em, tớ không phản hồi được. Em thử lại nhé!";

            setMessages(prev => [...prev, { sender: 'bot', text }]);

        } catch (error) {
            console.error("Chat Error:", error);
            let errorText = "Lỗi kết nối rồi em ơi!";
            if (error.message && error.message.includes("Missing API Key")) {
                errorText = "Chưa có cấu hình API Key em ơi. Nhờ thầy cô kiểm tra giúp nhé!";
            } else if (error.message && (error.message.includes("404") || error.message.includes("not found"))) {
                errorText = `Không tìm thấy mô hình AI. Thầy cô hãy cập nhật code lấy model mới nhất nhé. Lỗi: ${error.message}`;
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
