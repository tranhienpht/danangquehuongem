import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase';
import './QuizComponent.css';

const QuizComponent = ({ questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [userName, setUserName] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const currentQuestion = questions[currentQuestionIndex];

    const handleOptionClick = (option) => {
        if (showResult || selectedOptions.includes(option)) return;

        const newSelectedOptions = [...selectedOptions, option];
        setSelectedOptions(newSelectedOptions);
        const correct = option === currentQuestion.answer;
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (correct) {
            setShowResult(true);
            setScore(score + 1);
        } else if (newAttempts >= 2) {
            setShowResult(true);
        }
    };

    const handleNextQuestion = () => {
        setShowResult(false);
        setSelectedOptions([]);
        setAttempts(0);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizCompleted(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizCompleted(false);
        setShowResult(false);
        setSelectedOptions([]);
        setAttempts(0);
    };

    const handleSaveScore = async () => {
        if (!userName.trim()) {
            alert("Vui lòng nhập tên của em nhé!");
            return;
        }

        setIsSaving(true);
        try {
            await addDoc(collection(db, "scores"), {
                name: userName,
                score: score,
                total: questions.length,
                date: new Date().toISOString()
            });
            alert("Đã lưu điểm thành công! Em có thể xem trên Firebase.");
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Lỗi khi lưu điểm. Hãy kiểm tra kết nối mạng hoặc cài đặt Firebase.");
        }
        setIsSaving(false);
    };

    if (quizCompleted) {
        return (
            <div className="quiz-completed">
                <h2>🎉 Chúc mừng em đã hoàn thành! 🎉</h2>
                <p className="final-score">Số điểm của em: {score} / {questions.length}</p>
                <div className="feedback-message">
                    {score === questions.length ? "Xuất sắc! Em là một chuyên gia về Đà Nẵng! 🌟" :
                        score >= questions.length / 2 ? "Làm tốt lắm! Em đã hiểu biết rất nhiều! 👍" :
                            "Cố gắng thêm nhé! Hãy ôn lại bài học nào! 💪"}
                </div>

                <div className="save-score-section">
                    <p>Nhập tên để lưu điểm lên bảng vàng:</p>
                    <input
                        type="text"
                        placeholder="Tên của em là gì?"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="name-input"
                    />
                    <button
                        onClick={handleSaveScore}
                        className="save-btn"
                        disabled={isSaving}
                    >
                        {isSaving ? "Đang lưu..." : "Lưu Điểm 💾"}
                    </button>
                </div>

                <button onClick={restartQuiz} className="restart-btn">Làm lại bài thi</button>
            </div>
        );
    }

    return (
        <div className="quiz-card">
            <div className="quiz-header">
                <span>Câu hỏi {currentQuestionIndex + 1}/{questions.length}</span>
                <span>Điểm: {score}</span>
            </div>

            <div className="question-content">
                <h3>{currentQuestion.question}</h3>
            </div>

            <div className="options-grid">
                {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedOptions.includes(option);
                    const isWrong = isSelected && option !== currentQuestion.answer;
                    const isCorrectOption = option === currentQuestion.answer;

                    return (
                        <button
                            key={index}
                            className={`option-btn ${showResult && isCorrectOption ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                            onClick={() => handleOptionClick(option)}
                            disabled={showResult || isSelected}
                        >
                            {option}
                            {showResult && isCorrectOption && (
                                <span className="icon">✅</span>
                            )}
                            {isWrong && (
                                <span className="icon">❌</span>
                            )}
                        </button>
                    );
                })}
            </div>

            {showResult && (
                <div className="explanation-section">
                    <p><strong>Giải thích:</strong> {currentQuestion.explanation}</p>
                    <button onClick={handleNextQuestion} className="next-btn">
                        {currentQuestionIndex < questions.length - 1 ? "Câu tiếp theo ➡️" : "Xem kết quả 🏁"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizComponent;
