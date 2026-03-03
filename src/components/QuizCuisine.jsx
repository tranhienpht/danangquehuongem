import React, { useState, useRef } from 'react';
import './QuizCuisine.css';

const questionsData = [
    {
        type: 'interactive-matching',
        icon: '🍜',
        question: 'Em hãy ghép hình ảnh món ăn với đặc điểm đúng nhất:',
        leftItems: [
            { id: 'mi-quang', emoji: '🍜', label: 'Mì Quảng' },
            { id: 'cao-lau', emoji: '🍲', label: 'Cao lầu' }
        ],
        rightItems: [
            { id: 'desc-1', text: 'Sợi mì to, bản dẹt, màu trắng hoặc vàng (pha nghệ). Ăn kèm rau Trà Quế.' },
            { id: 'desc-2', text: 'Sợi mì từ gạo ngâm nước tro Tràm, màu vàng nhạt. Ăn kèm bánh tráng nướng giòn.' }
        ],
        pairs: [
            { left: 'mi-quang', right: 'desc-1' },
            { left: 'cao-lau', right: 'desc-2' }
        ],
        feedback: 'Xuất sắc! Mì Quảng có sợi mì bản dẹt và rau Trà Quế là đặc trưng, còn Cao lầu có sợi dai và bánh tráng nướng giòn rụm là "bí kíp" riêng.'
    },
    {
        type: 'interactive-matching',
        icon: '🥬',
        question: 'Em hãy ghép tên món ăn với loại rau sống đi kèm đúng nhất:',
        leftItems: [
            { id: 'mi-quang-2', emoji: '🍜', label: 'Mì Quảng' },
            { id: 'cao-lau-2', emoji: '🍲', label: 'Cao lầu' }
        ],
        rightItems: [
            { id: 'rau-1', text: 'Phải có rau sống Trà Quế (hái từ làng rau nổi tiếng ở Hội An).' },
            { id: 'rau-2', text: 'Thường ăn kèm giá đỗ chần và các loại rau thơm cơ bản.' }
        ],
        pairs: [
            { left: 'mi-quang-2', right: 'rau-1' },
            { left: 'cao-lau-2', right: 'rau-2' }
        ],
        feedback: 'Rau sống Trà Quế với đủ vị cay, chát, thơm là "bí kíp" tạo nên sức hấp dẫn khó cưỡng của bát Mì Quảng chính gốc.'
    },
    {
        type: 'interactive-matching',
        icon: '🫓',
        question: 'Em hãy ghép tên món ăn với phụ gia đặc trưng:',
        leftItems: [
            { id: 'mi-quang-3', emoji: '🍜', label: 'Mì Quảng' },
            { id: 'banh-trang', emoji: '🥜', label: 'Bánh tráng Túy Loan' }
        ],
        rightItems: [
            { id: 'desc-3', text: 'Nước dùng (nước lèo) sâm sấp, đậm đà từ tôm, thịt hoặc cá lóc.' },
            { id: 'desc-4', text: 'Bánh tráng nướng thơm mùi gừng, tỏi, giòn rụm khi ăn.' }
        ],
        pairs: [
            { left: 'mi-quang-3', right: 'desc-3' },
            { left: 'banh-trang', right: 'desc-4' }
        ],
        feedback: 'Bánh tráng nướng giòn rụm là "người bạn thân" không thể thiếu khi thưởng thức Mì Quảng, giúp món ăn thêm bùi và thơm.'
    },
    {
        type: 'multiple',
        icon: '🐄',
        question: 'Món "Bê thui Cầu Mống" là đặc sản nổi tiếng của địa phương nào ở Quảng Nam (cũ)?',
        options: ['A. Thành phố Hội An', 'B. Thị xã Điện Bàn', 'C. Huyện Tây Giang', 'D. Huyện Núi Thành'],
        correct: 1,
        feedback: 'Cầu Mống thuộc Điện Bàn là nơi có kỹ thuật thui bê gia truyền, khiến thịt chín tới nhưng vẫn giữ được màu hồng đào đẹp mắt.'
    },
    {
        type: 'multiple',
        icon: '🐟',
        question: 'Món ăn nào sau đây được gọi là "Gỏi cá trứ danh" của người dân Đà Nẵng?',
        options: ['A. Gỏi cá Nam Ô', 'B. Gỏi cá lóc', 'C. Gỏi cá trích', 'D. Gỏi cá nhái'],
        correct: 0,
        feedback: 'Gỏi cá Nam Ô (Liên Chiểu) nổi tiếng với cả hai loại: gỏi khô (cho người mới ăn) và gỏi ướt (cho người sành ăn).'
    },
    {
        type: 'multiple',
        icon: '🍰',
        question: 'Loại bánh nào sau đây là đặc sản truyền thống của người dân xứ Quảng trong dịp Tết, có hình dáng giống như chiếc tổ chim?',
        options: ['A. Bánh chưng', 'B. Bánh tét', 'C. Bánh tổ', 'D. Bánh ít'],
        correct: 2,
        feedback: 'Bánh tổ được làm từ đường đen và gừng, là món bánh ý nghĩa thể hiện lòng hiếu thảo với tổ tiên trong ngày Tết.'
    },
    {
        type: 'multiple',
        icon: '🏺',
        question: 'Làng nghề nước mắm truyền thống lâu đời nào ở Đà Nẵng đã được công nhận là Di sản văn hóa phi vật thể quốc gia?',
        options: ['A. Làng mắm Cẩm Thanh', 'B. Làng mắm Nam Ô', 'C. Làng mắm Thọ Quang', 'D. Làng mắm Mân Thái'],
        correct: 1,
        feedback: 'Nước mắm Nam Ô được làm từ cá cơm than, là niềm tự hào về làng nghề truyền thống gắn liền với lịch sử Đà Nẵng.'
    },
    {
        type: 'multiple',
        icon: '🍗',
        question: 'Khi thưởng thức "Cơm gà Tam Kỳ" (Quảng Nam), hạt cơm thường có màu gì đặc trưng?',
        options: ['A. Màu trắng tinh khôi', 'B. Màu vàng từ nước luộc gà và nghệ', 'C. Màu đỏ từ gấc', 'D. Màu xanh lá dứa'],
        correct: 1,
        feedback: 'Cơm gà Tam Kỳ hấp dẫn bởi hạt cơm vàng dẻo, thịt gà ta thả vườn dai ngọt và hành tây trắng giòn.'
    },
    {
        type: 'multiple',
        icon: '🥢',
        question: 'Món "Bánh tráng cuốn thịt heo" ở Đà Nẵng thường dùng loại nước chấm đặc trưng nào?',
        options: ['A. Nước mắm chua ngọt', 'B. Mắm nêm đậm đà', 'C. Tương bần', 'D. Xì dầu (Nước tương)'],
        correct: 1,
        feedback: 'Mắm nêm được pha chế công phu với thơm (dứa) băm nhỏ, ớt và tỏi là "linh hồn" tạo nên vị ngon cho món cuốn này.'
    },
    {
        type: 'multiple',
        icon: '💝',
        question: 'Tại sao mỗi học sinh chúng ta cần tìm hiểu và giới thiệu về ẩm thực địa phương Đà Nẵng - Quảng Nam?',
        options: [
            'A. Để biết chỗ nào bán đồ ăn rẻ hơn.',
            'B. Để trở thành đầu bếp trong tương lai.',
            'C. Để gìn giữ nét đẹp văn hóa và thể hiện lòng tự hào về quê hương.',
            'D. Chỉ để vượt qua các bài kiểm tra.'
        ],
        correct: 2,
        feedback: 'Hiểu về ẩm thực là hiểu về công lao lao động và bản sắc văn hóa của cha ông, từ đó bồi đắp lòng yêu quê hương trong mỗi chúng ta.'
    }
];

const createFireworks = (modalElement) => {
    if (!modalElement) return;
    const rect = modalElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const emojis = ['✨', '🎉', '⭐', '🌟', '💫', '🎊'];

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        particle.textContent = emoji;
        particle.className = 'fireworks-particle text-2xl';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';

        const angle = (Math.random() * Math.PI * 2);
        const velocity = 150 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        particle.style.animation = `fireworks-cuisine 1s ease-out forwards`;
        particle.style.animationDelay = (Math.random() * 0.3) + 's';

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1300);
    }
};

const QuizCuisine = ({ onBack, onComplete }) => {
    const [currentScreen, setCurrentScreen] = useState('start'); // start, question, result, review
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);

    // Feedback Modal State
    const [modalInfo, setModalInfo] = useState({ show: false, isCorrect: true, text: '' });

    // Matching Question State
    const [selectedLeftId, setSelectedLeftId] = useState(null);
    const [matchedPairs, setMatchedPairs] = useState(new Set());
    const [wrongLeftId, setWrongLeftId] = useState(null);
    const [wrongRightId, setWrongRightId] = useState(null);
    const [correctRightId, setCorrectRightId] = useState(null);

    const modalRef = useRef(null);
    const q = questionsData[currentQuestionIndex];

    const resetMatchState = () => {
        setSelectedLeftId(null);
        setMatchedPairs(new Set());
        setWrongLeftId(null);
        setWrongRightId(null);
        setCorrectRightId(null);
    };

    const startGame = () => {
        setCurrentScreen('question');
        setCurrentQuestionIndex(0);
        setScore(0);
        setAnswers([]);
        resetMatchState();
    };



    const showFeedback = (isCorrect, feedback) => {
        setModalInfo({ show: true, isCorrect, text: feedback });
        if (isCorrect) {
            setTimeout(() => createFireworks(modalRef.current), 50);
        }
    };

    const closeModalAndNext = () => {
        setModalInfo({ ...modalInfo, show: false });
        // Go to next question
        if (currentQuestionIndex + 1 < questionsData.length) {
            setCurrentQuestionIndex(prev => prev + 1);
            resetMatchState();
        } else {
            setCurrentScreen('result');
            checkLevelCompletion();
        }
    };

    const checkLevelCompletion = () => {
        if (score >= 80) { // arbitrary pass threshold, use 80 from original logic or just pass on completion
            if (onComplete) onComplete(true);
        }
    };

    // Interaction Handlers for Multiple Choice
    const selectAnswer = (index) => {
        // Prevent clicking again if already answered for this question
        if (answers.some(a => a.question === currentQuestionIndex)) return;

        const isCorrect = index === q.correct;
        const newScore = isCorrect ? score + 10 : score;

        setAnswers(prev => [...prev, {
            question: currentQuestionIndex,
            selected: index,
            correct: q.correct,
            isCorrect: isCorrect
        }]);

        if (isCorrect) {
            setScore(newScore);
            showFeedback(true, q.feedback);
        } else {
            showFeedback(false, q.feedback);
        }
    };

    // Interaction Handlers for Interactive Matching
    const handleLeftClick = (itemId) => {
        if (matchedPairs.has(itemId)) return;
        setSelectedLeftId(itemId === selectedLeftId ? null : itemId);
    };

    const handleRightClick = (itemId) => {
        if (!selectedLeftId) return; // Must select left first

        // Find correct pair
        const correctPair = q.pairs.find(p => p.left === selectedLeftId);

        if (correctPair && correctPair.right === itemId) {
            // Correct match
            const newMatched = new Set(matchedPairs);
            newMatched.add(selectedLeftId);
            newMatched.add(itemId);
            setMatchedPairs(newMatched);
            setCorrectRightId(itemId);

            // Check if all matched
            if (newMatched.size === q.pairs.length * 2) {
                const newScore = score + 10;
                setScore(newScore);
                setAnswers(prev => [...prev, {
                    question: currentQuestionIndex,
                    selected: null,
                    correct: null,
                    isCorrect: true
                }]);
                setTimeout(() => showFeedback(true, q.feedback), 500);
            }
        } else {
            // Wrong match
            setWrongLeftId(selectedLeftId);
            setWrongRightId(itemId);
            setTimeout(() => {
                setWrongLeftId(null);
                setWrongRightId(null);
            }, 600);
        }

        setSelectedLeftId(null);
    };

    // Start Screen
    if (currentScreen === 'start') {
        return (
            <div className="w-full min-h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 bg-pattern overflow-auto font-sans relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-orange-800 hover:text-orange-600 font-bold bg-white/70 px-4 py-2 rounded-lg shadow">
                    ← Trở về
                </button>
                <div className="text-center max-w-2xl mx-auto mt-10">
                    <div className="mb-6">
                        <div className="text-6xl mb-4 float-animation">🍜</div>
                        <div className="flex justify-center gap-3 text-4xl mb-6">
                            <span className="food-icon" style={{ animationDelay: '0.1s' }}>🥢</span>
                            <span className="food-icon" style={{ animationDelay: '0.2s' }}>🍲</span>
                            <span className="food-icon" style={{ animationDelay: '0.3s' }}>🥗</span>
                            <span className="food-icon" style={{ animationDelay: '0.4s' }}>🍚</span>
                            <span className="food-icon" style={{ animationDelay: '0.5s' }}>🧆</span>
                        </div>
                    </div>
                    <h1 className="title-font text-4xl md:text-5xl font-bold text-orange-800 mb-4 leading-tight">
                        Khám Phá Ẩm Thực<br /><span className="text-amber-600">Đà Nẵng - Quảng Nam (cũ)</span>
                    </h1>
                    <p className="text-lg text-orange-700 mb-8 max-w-lg mx-auto">
                        Cùng khám phá những món ăn đặc sản tuyệt vời của vùng đất miền Trung qua 10 câu hỏi thú vị! 🌟
                    </p>
                    <div className="bg-white/70 backdrop-blur rounded-2xl p-6 mb-8 shadow-lg border border-orange-200">
                        <div className="flex items-center justify-center gap-8 text-center">
                            <div>
                                <div className="text-3xl mb-2">📝</div>
                                <div className="text-2xl font-bold text-orange-800">10</div>
                                <div className="text-sm text-orange-600">Câu hỏi</div>
                            </div>
                            <div className="h-12 w-px bg-orange-200"></div>
                            <div>
                                <div className="text-3xl mb-2">🏆</div>
                                <div className="text-2xl font-bold text-orange-800">100</div>
                                <div className="text-sm text-orange-600">Điểm tối đa</div>
                            </div>
                            <div className="h-12 w-px bg-orange-200"></div>
                            <div>
                                <div className="text-3xl mb-2">💡</div>
                                <div className="text-2xl font-bold text-orange-800">∞</div>
                                <div className="text-sm text-orange-600">Kiến thức</div>
                            </div>
                        </div>
                    </div>
                    <button onClick={startGame} className="pulse-glow bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xl font-bold py-4 px-12 rounded-full shadow-xl transition-all duration-300 hover:scale-105">
                        🚀 Bắt Đầu Khám Phá!
                    </button>
                </div>
            </div>
        );
    }

    // Result Screen
    if (currentScreen === 'result') {
        const correctCount = answers.filter(a => a.isCorrect).length;
        const wrongCount = 10 - correctCount;
        let resultIcon = '💪';
        let resultTitle = 'Hãy cố gắng hơn nữa!';
        let resultMessage = 'Đừng nản chí! Mỗi lần chơi là một cơ hội để học hỏi thêm về văn hóa quê hương.';

        if (score >= 90) {
            resultIcon = '🏆';
            resultTitle = 'Tuyệt vời! Bạn là chuyên gia ẩm thực!';
            resultMessage = 'Bạn hiểu rất sâu về văn hóa ẩm thực Đà Nẵng - Quảng Nam. Hãy tiếp tục gìn giữ và lan tỏa nét đẹp này nhé!';
        } else if (score >= 70) {
            resultIcon = '🌟';
            resultTitle = 'Giỏi lắm! Bạn rất am hiểu!';
            resultMessage = 'Bạn đã nắm vững nhiều kiến thức về ẩm thực địa phương. Hãy tiếp tục tìm hiểu thêm nhé!';
        } else if (score >= 50) {
            resultIcon = '👍';
            resultTitle = 'Khá tốt! Cố gắng thêm nhé!';
            resultMessage = 'Bạn đã có những hiểu biết cơ bản. Hãy thử lại để khám phá thêm nhiều điều thú vị!';
        }

        return (
            <div className="w-full min-h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 bg-pattern overflow-auto font-sans relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-orange-800 hover:text-orange-600 font-bold bg-white/70 px-4 py-2 rounded-lg shadow">
                    ← Trở về
                </button>
                <div className="text-center max-w-2xl mx-auto bounce-in mt-10">
                    <div className="text-8xl mb-4">{resultIcon}</div>
                    <h2 className="title-font text-4xl font-bold text-orange-800 mb-4">{resultTitle}</h2>
                    <p className="text-lg text-orange-700 mb-6">{resultMessage}</p>

                    <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-2xl border border-orange-200 mb-8">
                        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500 mb-2">
                            {score}/100
                        </div>
                        <p className="text-orange-600 font-medium">Điểm của bạn</p>
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                                <div className="text-3xl mb-1">✅</div>
                                <div className="text-2xl font-bold text-green-600">{correctCount}</div>
                                <div className="text-sm text-green-600">Câu đúng</div>
                            </div>
                            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                                <div className="text-3xl mb-1">❌</div>
                                <div className="text-2xl font-bold text-red-500">{wrongCount}</div>
                                <div className="text-sm text-red-500">Câu sai</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center flex-wrap">
                        <button onClick={startGame} className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
                            🔄 Chơi lại
                        </button>
                        <button onClick={() => setCurrentScreen('review')} className="bg-white hover:bg-orange-50 text-orange-600 font-bold py-3 px-8 rounded-xl shadow-lg border-2 border-orange-300 transition-all duration-300 hover:scale-105">
                            📖 Xem lại đáp án
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Review Screen
    if (currentScreen === 'review') {
        return (
            <div className="w-full min-h-full flex flex-col items-center p-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 bg-pattern overflow-auto font-sans relative">
                <button onClick={onBack} className="absolute top-4 left-4 text-orange-800 hover:text-orange-600 font-bold bg-white/70 px-4 py-2 rounded-lg shadow">
                    ← Trở về
                </button>
                <div className="w-full max-w-3xl mx-auto mt-12 pb-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="title-font text-3xl font-bold text-orange-800">📖 Xem lại đáp án</h2>
                        <button onClick={() => setCurrentScreen('result')} className="bg-orange-100 hover:bg-orange-200 text-orange-700 font-semibold py-2 px-4 rounded-lg transition-colors">
                            ← Quay lại
                        </button>
                    </div>
                    <div className="space-y-4">
                        {questionsData.map((q, index) => {
                            const answer = answers.find(a => a.question === index);
                            // Fallback if not recorded (e.g. failed match but moved on? Should not happen)
                            const isCorrect = answer ? answer.isCorrect : false;

                            return (
                                <div key={index} className={`rounded-xl p-4 border-2 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">{isCorrect ? '✅' : '❌'}</span>
                                        <div className="flex-1">
                                            <div className="font-bold text-gray-800 mb-2">{q.icon} Câu {index + 1}: {q.question.split(':')[0]}</div>
                                            <div className="text-sm space-y-1">
                                                {q.type === 'multiple' ? (
                                                    <>
                                                        <div className="text-green-700"><strong>✓ Đáp án đúng:</strong> {q.options[q.correct]}</div>
                                                        {(!isCorrect && answer && answer.selected !== null) && (
                                                            <div className="text-red-600"><strong>✗ Bạn chọn:</strong> {q.options[answer.selected]}</div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <div className="text-green-700"><strong>✓ Các cặp đúng:</strong><br />
                                                        {q.pairs.map((p, i) => (
                                                            <div key={i}>- {p.left} → {p.right}</div>
                                                        ))}
                                                    </div>
                                                )}
                                                <div className="mt-2 p-2 bg-white/70 rounded-lg text-orange-700">
                                                    <strong>💡 Giải thích:</strong> {q.feedback}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={startGame} className="mt-6 w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-300">
                        🔄 Chơi lại
                    </button>
                </div>
            </div>
        );
    }

    // Question Screen
    const currentAnswerRecord = answers.find(a => a.question === currentQuestionIndex);

    return (
        <div className="w-full min-h-full flex flex-col p-4 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 bg-pattern overflow-auto font-sans relative">
            <button onClick={onBack} className="absolute top-4 left-4 text-orange-800 hover:text-orange-600 font-bold bg-white/70 px-4 py-2 rounded-lg shadow">
                ← Trở về
            </button>

            <div className="w-full max-w-3xl mx-auto mt-12 pb-10">
                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-orange-700 font-semibold">Câu hỏi {currentQuestionIndex + 1}/10</span>
                        <span className="text-orange-700 font-semibold">🌟 Điểm: {score}</span>
                    </div>
                    <div className="h-3 bg-orange-100 rounded-full overflow-hidden shadow-inner">
                        <div className="progress-fill h-full bg-gradient-to-r from-orange-400 to-amber-400 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / 10) * 100}%` }}></div>
                    </div>
                </div>

                {/* Question Card */}
                <div key={currentQuestionIndex} className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-orange-100 bounce-in">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4">
                        <div className="flex items-center gap-3">
                            <span className="text-4xl">{q.icon}</span>
                            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                                {q.type === 'interactive-matching' ? '🔗 Câu hỏi ghép đôi' : '📝 Câu hỏi trắc nghiệm'}
                            </span>
                        </div>
                    </div>
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
                            {q.question.split(':')[0]}
                            {q.type === 'interactive-matching' && q.pairs && (
                                <div className="mt-4 space-y-2 text-base font-normal">
                                    {q.pairs.map((pair, idx) => (
                                        <div key={idx} className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400">
                                            <strong>{pair.left}</strong> → {pair.right}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </h2>

                        {/* Options Container */}
                        <div className="space-y-3">
                            {q.type === 'interactive-matching' ? (
                                <div className="mt-6 grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        {q.leftItems.map(item => {
                                            const isSelected = selectedLeftId === item.id;
                                            const isMatched = matchedPairs.has(item.id);
                                            const isWrong = wrongLeftId === item.id;

                                            let btnClass = 'w-full p-4 rounded-xl border-4 bg-gradient-to-br from-orange-100 to-amber-100 hover:from-orange-200 hover:to-amber-200 cursor-pointer transition-all duration-300 select-none';
                                            if (isSelected) btnClass += ' border-orange-500 ring-4 ring-orange-200';
                                            else if (isMatched) btnClass += ' opacity-50 cursor-not-allowed border-green-500 bg-green-100';
                                            else if (isWrong) btnClass += ' border-red-500 bg-red-50 shake-animation text-red-700';
                                            else btnClass += ' border-orange-300';

                                            return (
                                                <button
                                                    key={item.id}
                                                    disabled={isMatched}
                                                    onClick={() => handleLeftClick(item.id)}
                                                    className={btnClass}
                                                >
                                                    <div className="text-5xl mb-2">{item.emoji}</div>
                                                    <div className="font-bold text-orange-800">{item.label}</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="space-y-3">
                                        {q.rightItems.map(item => {
                                            const isMatched = matchedPairs.has(item.id);
                                            const isWrong = wrongRightId === item.id;
                                            const isCorrect = correctRightId === item.id;

                                            let btnClass = 'w-full p-4 rounded-xl border-4 bg-white hover:bg-blue-50 cursor-pointer transition-all duration-300 text-left select-none';
                                            if (isMatched || isCorrect) btnClass += ' opacity-50 cursor-not-allowed border-green-500 bg-green-100';
                                            else if (isWrong) btnClass += ' border-red-500 bg-red-50 shake-animation text-red-700';
                                            else btnClass += ' border-blue-300';

                                            return (
                                                <button
                                                    key={item.id}
                                                    disabled={isMatched}
                                                    onClick={() => handleRightClick(item.id)}
                                                    className={btnClass}
                                                >
                                                    <div className="text-sm text-gray-700 leading-relaxed font-medium">{item.text}</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                q.options.map((option, index) => {
                                    const isCorrectOpt = index === q.correct;
                                    const isSelectedOpt = currentAnswerRecord && currentAnswerRecord.selected === index;

                                    let btnClass = 'qc-option-btn w-full text-left p-4 rounded-xl border-2 font-medium transition-all duration-300';
                                    let content = <span className="text-lg">{option}</span>;

                                    if (currentAnswerRecord) {
                                        if (isCorrectOpt) {
                                            btnClass += ' border-green-500 bg-green-100 text-green-800';
                                            content = <span className="text-lg">✅ {option}</span>;
                                        } else if (isSelectedOpt && !isCorrectOpt) {
                                            btnClass += ' border-red-400 bg-red-50 text-red-700 shake-animation';
                                            content = <span className="text-lg">❌ {option}</span>;
                                        } else {
                                            btnClass += ' border-gray-200 bg-gray-50 text-gray-400';
                                        }
                                    } else {
                                        btnClass += ' border-orange-200 bg-orange-50 hover:bg-orange-100 hover:border-orange-400 text-gray-700';
                                    }

                                    return (
                                        <button
                                            key={index}
                                            disabled={!!currentAnswerRecord}
                                            onClick={() => selectAnswer(index)}
                                            className={btnClass}
                                        >
                                            {content}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback Modal */}
            {modalInfo.show && (
                <>
                    <div className="fixed inset-0 bg-black/40 modal-backdrop z-40" onClick={closeModalAndNext}></div>
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
                        <div ref={modalRef} className="feedback-modal pointer-events-auto bg-gradient-to-b from-yellow-50 to-amber-50 rounded-3xl shadow-2xl border-4 border-amber-200 max-w-sm w-full p-8 text-center">
                            <div className="text-8xl mb-6">
                                {modalInfo.isCorrect ? '🎉' : '💡'}
                            </div>
                            <h3 className={`text-2xl font-bold mb-4 ${modalInfo.isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
                                {modalInfo.isCorrect ? 'Chính xác rồi!' : 'Chưa đúng rồi!'}
                            </h3>
                            <p className="text-base text-gray-700 leading-relaxed mb-8 min-h-24">
                                {modalInfo.text}
                            </p>
                            <button onClick={closeModalAndNext} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 text-lg shadow-lg">
                                Tiếp tục ➡️
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default QuizCuisine;
