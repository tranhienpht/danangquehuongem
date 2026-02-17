import React, { useState } from 'react';
import './QuizComponent.css';

const QuizComponent = ({ questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    const handleOptionClick = (option) => {
        if (showResult) return; // Prevent clicking after selection

        setSelectedOption(option);
        const correct = option === currentQuestion.correctAnswer;
        setIsCorrect(correct);
        setShowResult(true);

        if (correct) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        setShowResult(false);
        setSelectedOption(null);
        setIsCorrect(null);

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
        setSelectedOption(null);
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
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        className={`option-btn ${selectedOption === option ? (isCorrect ? 'correct' : 'wrong') : ''} ${showResult && option === currentQuestion.correctAnswer ? 'correct' : ''}`}
                        onClick={() => handleOptionClick(option)}
                        disabled={showResult}
                    >
                        {option}
                        {showResult && option === selectedOption && (
                            <span className="icon">{isCorrect ? '✅' : '❌'}</span>
                        )}
                    </button>
                ))}
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
