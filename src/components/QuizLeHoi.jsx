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
                <div className="home-screen min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
                    {/* Decorative Lanterns */}
                    <div className="absolute top-4 left-4 text-5xl lantern float-animation" style={{ animationDelay: '0s' }}>🏮</div>
                    <div className="absolute top-4 right-4 text-5xl lantern float-animation" style={{ animationDelay: '0.5s' }}>🏮</div>
                    <div className="absolute top-20 left-1/4 text-3xl lantern float-animation" style={{ animationDelay: '1s' }}>🏮</div>
                    <div className="absolute top-20 right-1/4 text-3xl lantern float-animation" style={{ animationDelay: '1.5s' }}>🏮</div>

                    <div className="card-gradient rounded-3xl p-8 max-w-lg w-full shadow-2xl border-4 border-yellow-400 relative overflow-hidden z-10">
                        <div className="absolute -top-2 -left-2 w-20 h-20 bg-yellow-400 rounded-full opacity-30"></div>
                        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-emerald-500 rounded-full opacity-20"></div>

                        <div className="relative z-10">
                            <div className="text-center mb-4">
                                <span className="text-7xl block mb-2">🎊</span>
                            </div>
                            <h1 className="title-font text-4xl md:text-5xl font-extrabold text-center text-emerald-800 mb-2 drop-shadow-sm">Lễ Hội Xứ Quảng</h1>
                            <p className="text-center text-emerald-600 font-semibold mb-6 text-lg">Khám phá văn hóa Đà Nẵng - Quảng Nam! 🎋</p>

                            <div className="bg-emerald-50 rounded-2xl p-4 mb-6 border-2 border-emerald-200">
                                <div className="flex items-center justify-center gap-6 flex-wrap">
                                    <div className="text-center">
                                        <span className="text-3xl block">📝</span>
                                        <p className="text-emerald-700 font-bold">10 Câu hỏi</p>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-3xl block">⏱️</span>
                                        <p className="text-emerald-700 font-bold">2 Phút</p>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-3xl block">🎯</span>
                                        <p className="text-emerald-700 font-bold">8/10 để qua</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-yellow-50 rounded-xl p-4 mb-6 border-2 border-yellow-300">
                                <h3 className="font-bold text-yellow-800 mb-2 flex items-center gap-2"><span>📜</span> Luật chơi:</h3>
                                <ul className="text-yellow-700 text-sm space-y-1 text-left list-none pl-0">
                                    <li>✨ Mỗi câu đúng được +1 điểm</li>
                                    <li>🎆 Trả lời đúng có hiệu ứng pháo hoa</li>
                                    <li>🔓 Đạt 8/10 điểm để qua thử thách</li>
                                </ul>
                            </div>

                            <button
                                onClick={startQuiz}
                                className="w-full py-4 px-8 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-emerald-900 font-extrabold text-xl rounded-2xl shadow-lg pulse-glow transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                <span>🚀</span> <span>BẮT ĐẦU KHÁM PHÁ</span> <span>🚀</span>
                            </button>

                            <button onClick={onBack} className="mt-4 w-full py-2 text-emerald-700 hover:text-emerald-900 font-bold">
                                Quay lại danh sách
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-4 text-4xl z-10">
                        <span className="float-animation" style={{ animationDelay: '0.2s' }}>🏛️</span>
                        <span className="float-animation" style={{ animationDelay: '0.4s' }}>⛩️</span>
                        <span className="float-animation" style={{ animationDelay: '0.6s' }}>🐉</span>
                        <span className="float-animation" style={{ animationDelay: '0.8s' }}>🎎</span>
                        <span className="float-animation" style={{ animationDelay: '1s' }}>🛕</span>
                    </div>
                </div>
            )}

            {screen === 'quiz' && (
                <div className="quiz-screen min-h-screen flex flex-col p-4">
                    <div className="card-gradient rounded-2xl p-4 mb-4 shadow-lg border-2 border-yellow-400">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">📚</span>
                                <div>
                                    <p className="text-emerald-800 font-bold">Câu {currentQuestion + 1}/10</p>
                                    <div className="w-32 h-2 bg-emerald-200 rounded-full overflow-hidden">
                                        <div className="progress-bar h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" style={{ width: `${((currentQuestion + 1) / 10) * 100}%` }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${timeLeft <= 30 ? 'bg-red-100 timer-warning' : 'bg-emerald-100'}`}>
                                <span className="text-2xl">⏰</span>
                                <span className={`text-2xl font-bold ${timeLeft <= 30 ? 'text-red-600' : 'text-emerald-800'}`}>{formatTime(timeLeft)}</span>
                            </div>

                            <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-xl">
                                <span className="text-2xl">⭐</span>
                                <span className="text-2xl font-bold text-yellow-700">{score}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="card-gradient rounded-3xl p-6 shadow-xl border-2 border-yellow-400 flex-1 flex flex-col">
                            <div className="bg-emerald-50 rounded-2xl p-5 mb-6 border-2 border-emerald-200">
                                <p className="text-lg md:text-xl font-bold text-emerald-800 leading-relaxed text-left">
                                    {quizData[currentQuestion].question}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                                {quizData[currentQuestion].options.map((option, index) => {
                                    const labels = ['A', 'B', 'C', 'D'];
                                    let btnClass = "option-btn slide-up bg-white hover:bg-emerald-50 border-3 border-emerald-200 rounded-xl p-4 text-left font-semibold text-emerald-800 flex items-center gap-3 shadow-md";
                                    let spanClass = "w-10 h-10 flex items-center justify-center bg-emerald-100 rounded-full font-bold text-emerald-600 shrink-0";

                                    if (isAnswered) {
                                        const isCorrectOpt = index === quizData[currentQuestion].correct;
                                        const isSelectedOpt = index === selectedOption;

                                        if (isCorrectOpt) {
                                            btnClass = "option-btn bg-green-100 border-3 border-green-500 rounded-xl p-4 text-left font-semibold text-emerald-800 flex items-center gap-3 shadow-md";
                                            spanClass = "w-10 h-10 flex items-center justify-center bg-green-500 rounded-full font-bold text-white shrink-0";
                                        } else if (isSelectedOpt && !isCorrectOpt) {
                                            btnClass = "option-btn bg-red-100 border-3 border-red-500 shake-animation rounded-xl p-4 text-left font-semibold text-emerald-800 flex items-center gap-3 shadow-md";
                                            spanClass = "w-10 h-10 flex items-center justify-center bg-red-500 rounded-full font-bold text-white shrink-0";
                                        } else {
                                            btnClass += " opacity-50";
                                        }
                                    }

                                    return (
                                        <button
                                            key={index}
                                            disabled={isAnswered}
                                            onClick={() => handleAnswer(index)}
                                            className={btnClass}
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            <span className={spanClass}>{labels[index]}</span>
                                            <span className="flex-1">{option}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {feedback && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                            <div className={`card-gradient rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 text-center bounce-in ${feedback.correct ? 'border-green-400' : 'border-red-400'}`}>
                                <div className="text-7xl mb-4">{feedback.correct ? '🎉' : '😅'}</div>
                                <h3 className={`title-font text-3xl font-bold mb-4 ${feedback.correct ? 'text-green-600' : 'text-red-600'}`}>
                                    {feedback.correct ? 'Xuất sắc!' : 'Chưa đúng rồi!'}
                                </h3>
                                <p className="text-lg mb-6 text-slate-700">{feedback.text}</p>
                                <button
                                    onClick={nextQuestion}
                                    className="py-3 px-8 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all"
                                >
                                    Tiếp tục ➡️
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {screen === 'result' && (
                <div className="result-screen min-h-screen flex flex-col items-center justify-center p-4">
                    <div className="card-gradient rounded-3xl p-8 max-w-lg w-full shadow-2xl border-4 border-yellow-400 relative overflow-hidden">
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20"></div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500 rounded-full opacity-20"></div>

                        <div className="relative z-10 text-center">
                            <div className="text-8xl mb-4">{score >= 8 ? '🏆' : '💪'}</div>
                            <h2 className={`title-font text-4xl font-extrabold mb-4 ${score >= 8 ? 'text-emerald-800' : 'text-yellow-700'}`}>
                                {score >= 8 ? 'Tuyệt vời! Bạn quá giỏi!' : 'Cố gắng thêm nhé!'}
                            </h2>

                            <div className="bg-emerald-50 rounded-2xl p-6 mb-6 border-2 border-emerald-200">
                                <p className="text-emerald-600 font-semibold mb-2">Điểm số của bạn</p>
                                <div className="flex items-center justify-center gap-3">
                                    <span className="text-5xl">⭐</span>
                                    <span className="text-6xl font-extrabold text-yellow-600">{score}</span>
                                    <span className="text-3xl text-emerald-600 font-bold">/10</span>
                                </div>
                            </div>

                            <div className="bg-yellow-50 rounded-xl p-4 mb-6 border-2 border-yellow-300">
                                <p className="text-yellow-700 font-semibold">⏱️ Thời gian: <span className="font-bold">{formatTime(120 - timeLeft)}</span></p>
                            </div>

                            {score >= 8 ? (
                                <div className="bg-green-100 rounded-xl p-4 border-2 border-green-400 mb-6">
                                    <p className="text-green-700 font-bold flex items-center justify-center gap-2">
                                        <span className="text-2xl">🔓</span> Thử thách vượt qua!
                                    </p>
                                    <p className="text-green-600 mt-2">Bạn là chuyên gia văn hóa xứ Quảng! 🎊</p>
                                </div>
                            ) : (
                                <div className="bg-yellow-100 rounded-xl p-4 border-2 border-yellow-400 mb-6">
                                    <p className="text-yellow-700 font-bold flex items-center justify-center gap-2">
                                        <span className="text-2xl">🔒</span> Cần {8 - score} điểm nữa để qua bài!
                                    </p>
                                    <p className="text-yellow-600 mt-2">Hãy thử lại để khám phá thêm về văn hóa quê hương! 📚</p>
                                </div>
                            )}

                            <div className="flex flex-col gap-3">
                                <button onClick={startQuiz} className="w-full py-4 px-8 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-lg rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                                    🔄 Chơi lại
                                </button>
                                <button onClick={() => { setScreen('home'); onBack(); }} className="w-full py-3 px-8 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-emerald-900 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                                    🏠 Về trang nhiệm vụ
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
