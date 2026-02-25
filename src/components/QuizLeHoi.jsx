import React, { useState, useEffect, useRef } from 'react';
import './QuizLeHoi.css';
import confetti from 'canvas-confetti';

const quizData = [
    {
        question: "Lễ hội Quán Thế Âm (lễ hội Chùa Non Nước) thường được tổ chức tại địa danh nào của Đà Nẵng?",
        options: ["Bán đảo Sơn Trà", "Danh thắng Ngũ Hành Sơn", "Đèo Hải Vân", "Bà Nà Hills"],
        correct: 1,
        feedback: "Lễ hội diễn ra tại chùa Quán Thế Âm, thuộc ngọn núi Kim Sơn trong quần thể Ngũ Hành Sơn vào ngày 19/2 âm lịch hàng năm. 🏔️"
    },
    {
        question: "Lễ hội Cầu ngư của ngư dân vùng biển Đà Nẵng gắn liền với việc thờ cúng vị thần nào?",
        options: ["Thần Núi (Sơn Thần)", "Thần Nông", "Cá Ông (Cá Voi)", "Thành hoàng làng"],
        correct: 2,
        feedback: "Ngư dân thờ cúng Cá Ông để bày tỏ lòng biết ơn vì \"vị thần biển\" này thường giúp đỡ họ vượt qua sóng gió, tai nạn khi lênh đênh trên biển. 🐋"
    },
    {
        question: "Hoạt động \"Đêm rằm phố cổ\" với việc thả đèn hoa đăng trên sông Hoài là nét đặc trưng của địa danh nào?",
        options: ["Thành phố Tam Kỳ", "Thành phố Đà Nẵng", "Thành phố Hội An", "Thị xã Điện Bàn"],
        correct: 2,
        feedback: "Cứ vào tối 14 âm lịch hàng tháng, phố cổ Hội An lại tắt đèn điện, thắp đèn lồng và tổ chức thả hoa đăng cầu may mắn trên sông Hoài. 🏮"
    },
    {
        question: "Lễ hội Đình làng Túy Loan (Đà Nẵng) nổi tiếng với hai đặc sản ẩm thực truyền thống nào sau đây?",
        options: ["Bánh chưng và Bánh tét", "Mì Quảng và Bánh tráng", "Bánh xèo và Nem lụi", "Cơm gà và Cao lầu"],
        correct: 1,
        feedback: "Làng cổ Túy Loan nổi tiếng với nghề làm bánh tráng và mì Quảng, đây là những món ăn không thể thiếu trong các dịp lễ hội tại đây. 🍜"
    },
    {
        question: "Nghi lễ quan trọng nhất trong Lễ hội Quán Thế Âm Ngũ Hành Sơn là gì?",
        options: ["Cuộc thi chạy Marathon", "Lễ rước tượng Phật Bà Quán Thế Âm", "Hội thi nấu cơm", "Biểu diễn múa lân sư rồng"],
        correct: 1,
        feedback: "Lễ rước tượng Phật Bà Quán Thế Âm là nghi lễ trang trọng nhất, cầu mong hòa bình, quốc thái dân an và lòng từ bi. 🙏"
    },
    {
        question: "Lễ hội Bà Thu Bồn ở Quảng Nam (cũ) gắn liền với đời sống của cư dân ven dòng sông nào?",
        options: ["Sông Hàn", "Sông Cu Đê", "Sông Thu Bồn", "Sông Cổ Cò"],
        correct: 2,
        feedback: "Lễ hội diễn ra bên dòng sông Thu Bồn nhằm tưởng nhớ bà Mẹ xứ sở và cầu mong cho mùa màng tươi tốt, giao thông đường thủy thuận lợi. 🌾"
    },
    {
        question: "Hoạt động nào dưới đây thường diễn ra trong phần \"Hội\" của lễ hội Cầu ngư tại Đà Nẵng?",
        options: ["Thi đấu cờ người", "Hát Bả trạo và đua thuyền rồng", "Thi hái hoa dân chủ", "Biểu diễn xiếc thú"],
        correct: 1,
        feedback: "Hát Bả trạo (hát chèo thuyền) và đua thuyền là những hoạt động văn hóa đặc trưng, thể hiện sức mạnh và sự đoàn kết của ngư dân. 🚣"
    },
    {
        question: "Lễ hội nào sau đây ở Quảng Nam (cũ) thể hiện sự giao thoa văn hóa giữa người Việt và người Chăm?",
        options: ["Lễ hội Bà Chiêm Sơn", "Lễ hội Lục tánh vương gia", "Lễ hội Quạt làng mông", "Lễ hội xuống đồng"],
        correct: 0,
        feedback: "Lễ hội Dinh Bà Chiêm Sơn là một minh chứng sống động cho sự tiếp nối và giao thoa văn hóa giữa hai dân tộc Kinh và Chăm trên vùng đất Quảng (cũ). 🤝"
    },
    {
        question: "Khi tham gia lễ hội truyền thống, hành động nào sau đây là văn minh và đúng mực?",
        options: ["Leo trèo lên các tượng đá để chụp ảnh", "Xả rác ra sân đình, chùa sau khi ăn uống", "Ăn mặc lịch sự, giữ gìn vệ sinh chung", "Chen lấn, xô đẩy khi đi xem rước lễ"],
        correct: 2,
        feedback: "Giữ thái độ tôn trọng, ăn mặc chỉnh tề và giữ gìn vệ sinh là cách học sinh thể hiện lòng yêu nước và ý thức bảo tồn văn hóa quê hương. 🎓"
    },
    {
        question: "Đình làng Túy Loan được công nhận là Di tích lịch sử văn hóa cấp quốc gia vào năm nào?",
        options: ["1994", "1999", "2004", "2009"],
        correct: 0,
        feedback: "Đình làng Túy Loan đã được công nhận là Di tích lịch sử văn hóa cấp quốc gia vào năm 1994, là một trong những ngôi đình cổ nhất Đà Nẵng. 🏛️"
    }
];

const QuizLeHoi = ({ onBack }) => {
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
        if (score >= 8 || score + (isAnswered && feedback?.correct ? 1 : 0) >= 8) {
            playSound('correct');
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 }
            });
        }
    };

    const handleAnswer = (index) => {
        if (isAnswered) return;
        setIsAnswered(true);
        setSelectedOption(index);

        const q = quizData[currentQuestion];
        const isCorrect = index === q.correct;

        if (isCorrect) {
            setScore(s => s + 1);
            playSound('correct');
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
            setFeedback({ correct: true, text: q.feedback });
        } else {
            playSound('wrong');
            setFeedback({ correct: false, text: q.feedback });
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
                        <img src="https://raw.githubusercontent.com/tranhienpht/danangquehuongem/main/public/images/food-illustration.png" alt="food" className="hero-img" onError={(e) => { e.target.style.display = 'none'; }} />
                        <div className="emoji-row">
                            <span className="text-3xl">🥢</span><span className="text-3xl">🍲</span><span className="text-3xl">🥗</span><span className="text-3xl">🍚</span><span className="text-3xl">🌰</span>
                        </div>
                    </div>

                    <h1 className="title-font text-5xl-responsive font-extrabold text-center mb-4 quiz-title-color">Khám Phá Ẩm Thực Đà Nẵng Quảng Nam</h1>
                    <p className="text-center font-semibold mb-10 text-xl subtitle-text quiz-subtitle-color">Cùng khám phá những món ăn đặc sản tuyệt vời của vùng đất miền Trung qua 10 câu hỏi thú vị! 🌟</p>

                    <div className="quiz-card-main">
                        <div className="flex-around">
                            <div className="text-center flex-1">
                                <span className="text-4xl mb-2">📝</span>
                                <p className="font-extrabold text-3xl quiz-stat-val">10</p>
                                <p className="font-medium quiz-stat-label">Câu hỏi</p>
                            </div>
                            <div className="text-center flex-1">
                                <span className="text-4xl mb-2">⏱️</span>
                                <p className="font-extrabold text-3xl quiz-stat-val">2</p>
                                <p className="font-medium quiz-stat-label">Phút</p>
                            </div>
                            <div className="text-center flex-1">
                                <span className="text-4xl mb-2">🎯</span>
                                <p className="font-extrabold text-3xl quiz-stat-val">8/10</p>
                                <p className="font-medium quiz-stat-label">Để mở khóa</p>
                            </div>
                        </div>

                        <div className="quiz-rules-box">
                            <h3 className="flex-center"><span className="rule-icon">📜</span> Luật chơi:</h3>
                            <ul>
                                <li>✨ Mỗi câu đúng được +1 điểm</li>
                                <li>🎆 Trả lời đúng có hiệu ứng pháo hoa</li>
                                <li>🔓 Đạt 8/10 điểm để qua thử thách</li>
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
                                    <p className="quiz-text-dark font-bold text-lg">Câu {currentQuestion + 1}/10</p>
                                    <div className="quiz-progress-track">
                                        <div className="quiz-progress-fill" style={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}></div>
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
                                {quizData[currentQuestion].options.map((option, index) => {
                                    const labels = ['A', 'B', 'C', 'D'];
                                    let btnClass = "quiz-option-btn ";
                                    let spanClass = "quiz-option-label ";

                                    if (isAnswered) {
                                        const isCorrectOpt = index === quizData[currentQuestion].correct;
                                        const isSelectedOpt = index === selectedOption;

                                        if (isCorrectOpt) {
                                            btnClass += "quiz-opt-correct";
                                            spanClass += "quiz-lbl-correct";
                                        } else if (isSelectedOpt && !isCorrectOpt) {
                                            btnClass += "quiz-opt-wrong shake-animation";
                                            spanClass += "quiz-lbl-wrong";
                                        } else {
                                            btnClass += "quiz-opt-disabled opacity-60";
                                            spanClass += "quiz-lbl-disabled";
                                        }
                                    } else {
                                        // default state classes handled by quiz-option-btn in CSS
                                    }

                                    return (
                                        <button
                                            key={index}
                                            disabled={isAnswered}
                                            onClick={() => handleAnswer(index)}
                                            className={btnClass}
                                        >
                                            <span className={spanClass}>{labels[index]}</span>
                                            <span className="flex-1">{option}</span>
                                            {isAnswered && index === quizData[currentQuestion].correct && (
                                                <span className="text-2xl text-green-500 animate-bounce">✓</span>
                                            )}
                                            {isAnswered && index === selectedOption && index !== quizData[currentQuestion].correct && (
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
                            <div className="feedback-emoji">{score >= 8 ? '🏆' : '💪'}</div>
                            <h2 className={`title-font result-title ${score >= 8 ? 'result-title-pass' : 'result-title-fail'}`}>
                                {score >= 8 ? 'Tuyệt vời!' : 'Cố gắng thêm nhé!'}
                            </h2>

                            <div className="result-score-box">
                                <p className="result-score-label">Điểm số của bạn</p>
                                <div className="flex-center gap-4">
                                    <span className="star-icon">⭐</span>
                                    <span className="result-score-val">{score}</span>
                                    <span className="result-score-max">/10</span>
                                </div>
                            </div>

                            <div className="result-time-box">
                                <p>⏱️ Thời gian hoàn thành: <span className="time-val">{formatTime(120 - timeLeft)}</span></p>
                            </div>

                            {score >= 8 ? (
                                <div className="result-pass-msg">
                                    <p className="pass-title">
                                        <span>🔓</span> Thử thách vượt qua!
                                    </p>
                                    <p className="pass-desc">Bạn là chuyên gia văn hóa xứ Quảng! 🎊</p>
                                </div>
                            ) : (
                                <div className="result-fail-msg">
                                    <p className="fail-title">
                                        <span>🔒</span> Chưa đủ điểm
                                    </p>
                                    <p className="fail-desc">Cần {8 - score} điểm nữa để qua bài. Hãy thử lại! 📚</p>
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

export default QuizLeHoi;
