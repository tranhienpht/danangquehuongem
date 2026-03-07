import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Send, User, Bot, Sparkles, Globe, ExternalLink, MessageSquare } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import AiAssistant from './AiAssistant';
import { festivalsData } from '../data/festivalsData';
import { timelineEvents, historicalFigures } from '../data/historyData';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Chào bạn! Mình là trợ lý thông minh Đà Nẵng. Bạn muốn hỏi gì, hãy đặt câu hỏi nhé! 🤖' }
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

        // Add Geography
        context += "Địa lý và Ranh giới:\n";
        context += "Từ 1/7/2025, Đà Nẵng tiếp giáp với 3 tỉnh:\n";
        context += "- Phía Bắc: Giáp tỉnh Thừa Thiên Huế.\n";
        context += "- Phía Nam/Tây Nam: Giáp tỉnh Quảng Ngãi và Kon Tum.\n";
        context += "- Phía Tây: Giáp nước Cộng hòa Dân chủ Nhân dân Lào.\n";
        context += "- Phía Đông: Giáp Biển Đông.\n\n";

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
            // Thay vì gọi trực tiếp Google, ta gọi API trung gian (Backend proxy)
            const response = await fetch("http://localhost:3001/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: userMsg,
                    modelName: "gemini-2.5-flash", // Mô hình hỗ trợ mới nhất
                    systemInstruction: `Bạn là 'Trợ lý Đà Nẵng', người bạn đồng hành của học sinh lớp 4.\n\nQUY TẮC TRẢ LỜI CỰC KỲ QUAN TRỌNG:\n1. Ngắn gọn: Thường trả lời 1-2 câu ngắn. TUY NHIÊN, nếu câu trả lời chứa danh sách (như vị trí địa lý, ranh giới), BẮT BUỘC giữ nguyên các gạch đầu dòng và liệt kê đầy đủ để học sinh dễ đọc.\n2. Trọng tâm: Đi thẳng vào vấn đề, không giải thích dài dòng.\n3. Ngôn ngữ: Sử dụng từ ngữ đơn giản, gần gũi và vui vẻ (xưng 'mình' và 'bạn').\n4. Dữ liệu: Lấy tuyệt đối 100% từ 'Dữ liệu về Đà Nẵng' dưới đây. Đặc biệt từ 1/7/2025 sáp nhập Quảng Nam, phải nhớ rõ ranh giới mới.\n\nDữ liệu về Đà Nẵng:\n${getContextData()}`
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Lỗi phản hồi từ máy chủ");
            }

            const data = await response.json();
            const text = data.text || "Xin lỗi bạn, mình không phản hồi được. Bạn thử lại nhé!";

            setMessages(prev => [...prev, { sender: 'bot', text }]);

        } catch (error) {
            console.error("Chat Error:", error);
            let errorText = "Lỗi kết nối rồi bạn ơi!";

            if (error.message.includes("Failed to fetch")) {
                errorText = "Không thể kết nối đến Máy chủ (Server) AI. Bạn hãy chắc chắn đã chạy lệnh `node server.js` nhé!";
            } else {
                errorText = `Lỗi hệ thống AI: ${error.message}. Thầy cô hãy kiểm tra lại cấu hình nhé!`;
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
                        <div className="header-actions">
                            <button onClick={() => setIsOpen(false)} className="action-button minimize-button" title="Thu nhỏ (Giữ lại nội dung)">
                                <Minus size={20} />
                            </button>
                            <button onClick={() => {
                                setIsOpen(false);
                                setMessages([{ sender: 'bot', text: 'Chào bạn! Mình là trợ lý thông minh Đà Nẵng. Bạn muốn hỏi gì, hãy đặt câu hỏi nhé! 🤖' }]);
                            }} className="action-button close-button" title="Đóng (Xóa nội dung tin nhắn)">
                                <X size={20} />
                            </button>
                        </div>
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
                                placeholder="Bạn muốn hỏi mình điều gì?"
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
