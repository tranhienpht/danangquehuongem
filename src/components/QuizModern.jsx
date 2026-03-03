import React, { useState, useEffect, useRef } from 'react';
import './QuizModern.css';
import confetti from 'canvas-confetti';

const getThemeAssets = (id) => {
    const themes = {
        1: {
            heroImg: 'https://raw.githubusercontent.com/tranhienpht/danangquehuongem/main/public/images/map-illustration.png',
            emojis: ['🌍', '📍', '🗺️', '⛰️', '🌊'],
            title: 'Khám Phá Địa Lý Đà Nẵng Quảng Nam',
            subtitle: 'Cùng khám phá bản đồ địa lý và các mốc ranh giới của Thành phố Đà Nẵng nhé! 🗺️',
            passMsg: 'Bạn là chuyên gia bản đồ xuất sắc! 🎊',
            failMsg: 'Đọc kỹ lại bài học và thử lại nhé! 📚'
        },
        2: {
            heroImg: 'https://raw.githubusercontent.com/tranhienpht/danangquehuongem/main/public/images/food-illustration.png',
            emojis: ['🏮', '🎆', '🚣', '🎋', '🐉'],
            title: 'Khám Phá Lễ Hội Xứ Quảng',
            subtitle: 'Cùng khám phá những nét văn hóa lễ hội đặc sắc của vùng đất miền Trung! 🌟',
            passMsg: 'Bạn là chuyên gia văn hóa xứ Quảng! 🎊',
            failMsg: 'Tham gia thêm nhiều lễ hội để tích lũy kiến thức nhé! 📚'
        },
        3: {
            heroImg: 'https://raw.githubusercontent.com/tranhienpht/danangquehuongem/main/public/images/food-illustration.png',
            emojis: ['🥢', '🍲', '🥗', '🍚', '🌰'],
            title: 'Khám Phá Ẩm Thực Đà Nẵng',
            subtitle: 'Cùng khám phá những món ăn đặc sản tuyệt vời của vùng đất miền Trung! 🌟',
            passMsg: 'Bạn đích thực là siêu đầu bếp nhí! 🎊',
            failMsg: 'Hãy nếm thử thêm nhiều món ngon để ghi nhớ nhé! 📚'
        },
        4: {
            heroImg: 'https://raw.githubusercontent.com/tranhienpht/danangquehuongem/main/public/images/map-illustration.png',
            emojis: ['📜', '🏰', '⚔️', '🇻🇳', '🏛️'],
            title: 'Hồi Ức Những Trang Sử Vàng',
            subtitle: 'Ngược dòng thời gian tìm hiểu lịch sử hào hùng của quê hương! ⚔️',
            passMsg: 'Kiến thức lịch sử của bạn thật đáng nể! 🎊',
            failMsg: 'Hãy đọc thêm về các vị anh hùng lịch sử nhé! 📚'
        },
        5: {
            heroImg: 'https://raw.githubusercontent.com/tranhienpht/danangquehuongem/main/public/images/food-illustration.png',
            emojis: ['🌉', '🏙️', '🎡', '🏖️', '❤️'],
            title: 'Đà Nẵng Trong Tim Em',
            subtitle: 'Bạn hiểu bao nhiêu về thành phố đáng sống này? Hãy kiểm tra nhé! 🌉',
            passMsg: 'Đà Nẵng rất tự hào về bạn! 🎊',
            failMsg: 'Tiếp tục khám phá thành phố của chúng ta nhé! 📚'
        }
    };
    return themes[id] || { ...themes[1], title: 'Thử Thách Bài Học' };
};

const QuizModern = ({ mission, onBack, onComplete }) => {
    const theme = getThemeAssets(mission?.id);
    const quizData = mission?.questions || [];
    const totalQuestions = quizData.length;
    const passScore = mission?.passScore || Math.ceil(totalQuestions * 0.8);
    const [screen, setScreen] = useState('home'); // home, quiz, result
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(120);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState(null); // null, {correct: boolean, text: string}
    const [selectedOption, setSelectedOption] = useState(null);

    const audioCtxRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            audioCtxRef.current = new AudioContext();
        }
        return () => clearInterval(timerRef.current);
    }, []);

    const playSound = (type) => {
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        if (type === 'correct') {
            oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
            oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.4);
        } else {
            oscillator.frequency.setValueAtTime(200, ctx.currentTime);
            oscillator.frequency.setValueAtTime(150, ctx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.3);
        }
    };

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    endQuiz();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const startQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setTimeLeft(120);
        setIsAnswered(false);
        setFeedback(null);
        setSelectedOption(null);
        setScreen('quiz');
        startTimer();
    };

    const endQuiz = () => {
        clearInterval(timerRef.current);
        setScreen('result');
        const finalScore = score + (isAnswered && feedback?.correct ? 1 : 0);
        if (finalScore >= passScore) {
            playSound('correct');
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 }
            });
            if (onComplete) onComplete(true);
        } else {
            if (onComplete) onComplete(false);
        }
    };

    const handleAnswer = (option, index) => {
        if (isAnswered) return;
        setIsAnswered(true);
        setSelectedOption(index);

        const q = quizData[currentQuestion];
        // Handle both older 'correct' index and newer 'answer' string
        const isCorrect = q.answer ? option === q.answer : index === q.correct;

        if (isCorrect) {
            setScore(s => s + 1);
            playSound('correct');
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
            setFeedback({ correct: true, text: q.explanation || q.feedback });
        } else {
            playSound('wrong');
            setFeedback({ correct: false, text: q.explanation || q.feedback });
        }
    };

    const nextQuestion = () => {
        setFeedback(null);
        setIsAnswered(false);
        setSelectedOption(null);

        if (currentQuestion + 1 >= quizData.length) {
            endQuiz();
        } else {
            setCurrentQuestion(c => c + 1);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="quiz-lehoi-app">
            {screen === 'home' && (
                <div className="home-screen">
                    <div className="flex-col-center mb-6">
                        <img src={theme.heroImg} alt="minh-hoa" className="hero-img" onError={(e) => { e.target.style.display = 'none'; }} />
                        <div className="emoji-row">
                            {theme.emojis.map((emoji, i) => <span key={i} className="text-3xl">{emoji}</span>)}
                        </div>
                    </div>

                    <h1 className="title-font text-5xl-responsive font-extrabold text-center mb-4 quiz-title-color">{mission?.title || theme.title}</h1>
                    <p className="text-center font-semibold mb-10 text-xl subtitle-text quiz-subtitle-color">{theme.subtitle}</p>

                    <div className="quiz-card-main">
                        <div className="flex-around">
                            <div className="text-center flex-1">
                                <span className="text-4xl mb-2">📝</span>
                                <p className="font-extrabold text-3xl quiz-stat-val">{totalQuestions}</p>
                                <p className="font-medium quiz-stat-label">Câu hỏi</p>
                            </div>
                            <div className="text-center flex-1">
                                <span className="text-4xl mb-2">⏱️</span>
                                <p className="font-extrabold text-3xl quiz-stat-val">2</p>
                                <p className="font-medium quiz-stat-label">Phút</p>
                            </div>
                            <div className="text-center flex-1">
                                <span className="text-4xl mb-2">🎯</span>
                                <p className="font-extrabold text-3xl quiz-stat-val">{passScore}/{totalQuestions}</p>
                                <p className="font-medium quiz-stat-label">Để mở khóa</p>
                            </div>
                        </div>

                        <div className="quiz-rules-box">
                            <h3 className="flex-center"><span className="rule-icon">📜</span> Luật chơi:</h3>
                            <ul>
                                <li>✨ Mỗi câu đúng được +1 điểm</li>
                                <li>🎆 Trả lời đúng có hiệu ứng pháo hoa</li>
                                <li>🔓 Đạt {passScore}/{totalQuestions} điểm để qua thử thách</li>
                            </ul>
                        </div>

                        <div className="flex-col-center">
                            <button
                                onClick={startQuiz}
                                className="start-btn"
                            >
                                <span>🚀</span> BẮT ĐẦU KHÁM PHÁ <span>🚀</span>
                            </button>

                            <button onClick={onBack} className="mt-6 back-btn font-semibold text-lg transition-all">
                                Quay lại danh sách
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {screen === 'quiz' && (
                <div className="quiz-screen">
                    <div className="quiz-header-card">
                        <div className="quiz-header-top">
                            <div className="quiz-header-left">
                                <span className="quiz-icon-bg block-icon">📚</span>
                                <div>
                                    <p className="quiz-text-dark font-bold text-lg">Câu {currentQuestion + 1}/{totalQuestions}</p>
                                    <div className="quiz-progress-track">
                                        <div className="quiz-progress-fill" style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className={timeLeft <= 30 ? 'quiz-timer-urgent' : 'quiz-timer-normal'}>
                                <span>⏰</span> {formatTime(timeLeft)}
                            </div>

                            <div className="quiz-timer-normal">
                                <span>⭐</span> {score}
                            </div>
                        </div>
                    </div>

                    <div className="quiz-content-area">
                        <div className="quiz-question-container">
                            <div className="quiz-gradient-top"></div>

                            <div className="quiz-question-box">
                                <p className="quiz-question-text">
                                    {quizData[currentQuestion].question}
                                </p>
                            </div>

                            <div className="quiz-options-grid">
                                {(quizData[currentQuestion].fullOptions || quizData[currentQuestion].options).map((option, index) => {
                                    const labels = ['A', 'B', 'C', 'D'];
                                    let btnClass = "quiz-option-btn";
                                    let spanClass = "quiz-option-label";

                                    const q = quizData[currentQuestion];
                                    const isCorrectOpt = q.answer ? option === q.answer : index === q.correct;

                                    if (isAnswered) {
                                        const isSelectedOpt = index === selectedOption;

                                        if (isCorrectOpt) {
                                            btnClass += " quiz-opt-correct";
                                            spanClass += " quiz-lbl-correct";
                                        } else if (isSelectedOpt && !isCorrectOpt) {
                                            btnClass += " quiz-opt-wrong shake-animation";
                                            spanClass += " quiz-lbl-wrong";
                                        } else {
                                            btnClass += " quiz-opt-disabled opacity-60";
                                            spanClass += " quiz-lbl-disabled";
                                        }
                                    }

                                    return (
                                        <button
                                            key={index}
                                            disabled={isAnswered}
                                            onClick={() => handleAnswer(option, index)}
                                            className={btnClass}
                                        >
                                            <span className={spanClass}>{labels[index]}</span>
                                            <span className="flex-1 text-left">{option}</span>
                                            {isAnswered && isCorrectOpt && (
                                                <span className="text-2xl text-green-500 animate-bounce">✓</span>
                                            )}
                                            {isAnswered && index === selectedOption && !isCorrectOpt && (
                                                <span className="text-2xl text-red-500">✗</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {feedback && (
                        <div className="quiz-modal-overlay">
                            <div className={`quiz-feedback-modal bounce-in ${feedback.correct ? 'border-green' : 'border-red'}`}>
                                <div className="feedback-emoji">{feedback.correct ? '🎉' : '😅'}</div>
                                <h3 className={`title-font feedback-title ${feedback.correct ? 'feedback-text-correct' : 'feedback-text-wrong'}`}>
                                    {feedback.correct ? 'Quá xuất sắc!' : 'Ôi không!'}
                                </h3>
                                <p className="feedback-desc">{feedback.text}</p>
                                <button onClick={nextQuestion} className="continue-btn">
                                    Tiếp tục nào ➡️
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {screen === 'result' && (
                <div className="result-screen">
                    <div className="quiz-result-card">
                        <div className="result-blob-1"></div>
                        <div className="result-blob-2"></div>

                        <div className="relative z-10">
                            <div className="feedback-emoji">{score >= passScore ? '🏆' : '💪'}</div>
                            <h2 className={`title-font result-title ${score >= passScore ? 'result-title-pass' : 'result-title-fail'}`}>
                                {score >= passScore ? 'Tuyệt vời!' : 'Cố gắng thêm nhé!'}
                            </h2>

                            <div className="result-score-box">
                                <p className="result-score-label">Điểm số của bạn</p>
                                <div className="flex-center gap-4">
                                    <span className="star-icon">⭐</span>
                                    <span className="result-score-val">{score}</span>
                                    <span className="result-score-max">/{totalQuestions}</span>
                                </div>
                            </div>

                            <div className="result-time-box">
                                <p>⏱️ Thời gian hoàn thành: <span className="time-val">{formatTime(120 - timeLeft)}</span></p>
                            </div>

                            {score >= passScore ? (
                                <div className="result-pass-msg">
                                    <p className="pass-title">
                                        <span>🔓</span> Thử thách vượt qua!
                                    </p>
                                    <p className="pass-desc">{theme.passMsg}</p>
                                </div>
                            ) : (
                                <div className="result-fail-msg">
                                    <p className="fail-title">
                                        <span>🔒</span> Chưa đủ điểm
                                    </p>
                                    <p className="fail-desc">Cần {passScore - score} điểm nữa để qua bài. {theme.failMsg}</p>
                                </div>
                            )}

                            <div className="result-actions">
                                <button onClick={startQuiz} className="start-btn actions-btn">
                                    <span>🔄</span> Chơi lại
                                </button>
                                <button onClick={() => { setScreen('home'); onBack(); }} className="back-btn-home actions-btn">
                                    <span>🏠</span> Về trang nhiệm vụ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizModern;
