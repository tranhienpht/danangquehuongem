import React, { useState, useEffect, useRef } from 'react';
import { missions } from '../data/missionsData';
import './Tasks.css';
import confetti from 'canvas-confetti';
import { ArrowLeft, Clock, CheckCircle, ChevronRight, Lock } from 'lucide-react';
import QuizLeHoi from '../components/QuizLeHoi';

const Tasks = () => {
    const [unlockedLevel, setUnlockedLevel] = useState(1);
    const [playingMission, setPlayingMission] = useState(null);

    // Game State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    // New Features: Timer, Feedback, Audio
    const [timeLeft, setTimeLeft] = useState(120); // Default 120s
    const [showFeedback, setShowFeedback] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);

    // Audio Context Refs
    const audioCtxRef = useRef(null);

    // Initial Load
    useEffect(() => {
        const savedLevel = localStorage.getItem('mission_unlocked_level');
        if (savedLevel) {
            setUnlockedLevel(parseInt(savedLevel));
        }

        // Init Audio Context on first interaction
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioCtxRef.current = new AudioContext();
    }, []);

    // Timer Logic
    useEffect(() => {
        if (playingMission && !showResult && !showFeedback && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setShowResult(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [playingMission, showResult, showFeedback, timeLeft]);

    // Sound Helpers
    const playCorrectSound = () => {
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5

        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.5);
    };

    const playWrongSound = () => {
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(200, ctx.currentTime);
        oscillator.frequency.setValueAtTime(150, ctx.currentTime + 0.2);

        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.4);
    };

    const playVictorySound = () => {
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        if (ctx.state === 'suspended') ctx.resume();

        const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.50];
        notes.forEach((freq, i) => {
            setTimeout(() => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.setValueAtTime(freq, ctx.currentTime);
                gain.gain.setValueAtTime(0.2, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.3);
            }, i * 100);
        });
    };

    const handleStartMission = (mission) => {
        if (mission.id > unlockedLevel) return;

        setPlayingMission(mission);
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowResult(false);
        setShowFeedback(false);
        setTimeLeft(120);
    };

    const handleAnswer = (selectedOption) => {
        const currentQuestion = playingMission.questions[currentQuestionIndex];
        const correct = selectedOption === currentQuestion.answer;

        setSelectedAnswer(selectedOption);
        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct) {
            setScore(prev => prev + 1);
            playCorrectSound();
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#fbbf24', '#f59e0b', '#22c55e', '#3b82f6']
            });
        } else {
            playWrongSound();
        }
    };

    const nextQuestion = () => {
        setShowFeedback(false);
        setSelectedAnswer(null);

        if (currentQuestionIndex + 1 < playingMission.questions.length) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleBackToHub = () => {
        setPlayingMission(null);
        setShowResult(false);
        setShowFeedback(false);
    };

    // Mission Completion Check
    useEffect(() => {
        if (showResult && playingMission) {
            const passed = score >= (playingMission.passScore || 8);
            if (passed) {
                playVictorySound();
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 }
                });
                if (playingMission.id === unlockedLevel && unlockedLevel < missions.length + 1) {
                    const nextLevel = unlockedLevel + 1;
                    setUnlockedLevel(nextLevel);
                    localStorage.setItem('mission_unlocked_level', nextLevel);
                }
            }
        }
    }, [showResult, score, playingMission, unlockedLevel]);

    // Format Time
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // --- RENDER ---

    // 1. GAME VIEW (Quiz + Result)
    if (playingMission) {
        // Special case for Mission 2 (Lễ Hội Xứ Quảng)
        if (playingMission.id === 2) {
            return <QuizLeHoi onBack={handleBackToHub} />;
        }

        if (showResult) {
            // RESULT SCREEN
            const passed = score >= (playingMission.passScore || 8);
            return (
                <div className="tasks-page flex flex-col items-center justify-center">
                    <div className="game-view-wrapper w-full">
                        <div className="game-container p-8 text-center" style={{ padding: '2rem' }}>
                            <div className="result-icon mb-4" style={{ fontSize: '5rem', marginBottom: '1rem' }}>{passed ? '🎉' : '💪'}</div>
                            <h2 className="result-title text-3xl font-bold text-slate-800 mb-2 font-baloo" style={{ fontSize: '2rem', color: '#1e3a8a', marginBottom: '0.5rem' }}>
                                {passed ? 'Hoàn thành nhiệm vụ!' : 'Cố gắng thêm nhé!'}
                            </h2>
                            <p className="text-slate-500 mb-8" style={{ color: '#64748b', marginBottom: '2rem' }}>{playingMission.title}</p>

                            <div className="bg-amber-100 rounded-2xl p-6 mb-8 max-w-sm mx-auto" style={{ background: '#fef3c7', borderRadius: '1rem', padding: '1.5rem', margin: '0 auto 2rem auto', maxWidth: '300px' }}>
                                <p className="text-amber-800 font-medium uppercase text-sm tracking-wider mb-2" style={{ color: '#92400e', textTransform: 'uppercase', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Điểm số của bạn</p>
                                <p className="text-6xl font-bold text-amber-600 font-baloo" style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#d97706', lineHeight: 1 }}>{score}/{playingMission.questions.length}</p>
                            </div>

                            {passed ? (
                                <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl max-w-md mx-auto" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.75rem', padding: '1rem', margin: '0 auto 2rem auto' }}>
                                    <p className="text-green-800 font-bold" style={{ color: '#166534', fontWeight: 'bold' }}>🎯 Xuất sắc!</p>
                                    <p className="text-green-700" style={{ color: '#15803d' }}>Bạn đã mở khóa nhiệm vụ tiếp theo.</p>
                                </div>
                            ) : (
                                <div className="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-xl max-w-md mx-auto" style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '0.75rem', padding: '1rem', margin: '0 auto 2rem auto' }}>
                                    <p className="text-orange-800 font-bold" style={{ color: '#9a3412', fontWeight: 'bold' }}>❌ Chưa đạt yêu cầu</p>
                                    <p className="text-orange-700" style={{ color: '#c2410c' }}>Cần đạt tối thiểu {playingMission.passScore || 8} điểm để đi tiếp.</p>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                <button
                                    className="px-6 py-3 rounded-xl font-bold bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
                                    style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: '#e2e8f0', color: '#334155', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                    onClick={handleBackToHub}>
                                    Về danh sách
                                </button>
                                <button
                                    className="px-6 py-3 rounded-xl font-bold bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-lg shadow-amber-200"
                                    style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: '#f59e0b', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 14px 0 rgba(245, 158, 11, 0.39)' }}
                                    onClick={() => handleStartMission(playingMission)}>
                                    Làm lại bài thi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // QUIZ SCREEN
        const currentQuestion = playingMission.questions[currentQuestionIndex];
        const progressPercent = ((currentQuestionIndex + 1) / playingMission.questions.length) * 100;

        return (
            <div className="tasks-page">
                <div className="game-view-wrapper">
                    <div className="game-container">
                        <div className="game-top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <button className="btn-back" onClick={handleBackToHub} style={{ color: '#475569' }}>
                                <ArrowLeft size={20} /> <span style={{ marginLeft: '0.5rem' }}>Quay lại</span>
                            </button>

                            <div className="flex flex-col items-center" style={{ textAlign: 'center' }}>
                                <h2 style={{ fontFamily: 'Baloo 2', fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: '#1e293b' }}>{playingMission.title}</h2>
                                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Nhiệm vụ 0{playingMission.id}</div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fee2e2', color: '#dc2626', padding: '0.5rem 1rem', borderRadius: '9999px', fontWeight: 'bold' }}>
                                <Clock size={16} /> {formatTime(timeLeft)}
                            </div>
                        </div>

                        <div className="question-area" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase' }}>Câu hỏi {currentQuestionIndex + 1}/{playingMission.questions.length}</span>
                                <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#f59e0b' }}>{score} điểm</span>
                            </div>

                            <div style={{ width: '100%', background: '#f1f5f9', height: '0.5rem', borderRadius: '9999px', overflow: 'hidden', marginBottom: '2rem' }}>
                                <div style={{ height: '100%', background: '#fbbf24', width: `${progressPercent}%`, transition: 'width 0.3s ease' }}></div>
                            </div>

                            <h3 className="q-text" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '2rem', lineHeight: '1.5' }}>
                                {currentQuestion.question}
                            </h3>

                            <div className="options-list" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {(currentQuestion.fullOptions || currentQuestion.options).map((option, index) => {
                                    let btnClass = "option-btn";
                                    const isSelected = option === selectedAnswer;
                                    const isRealAnswer = option === currentQuestion.answer;
                                    const labels = ['A', 'B', 'C', 'D'];

                                    if (showFeedback) {
                                        if (isRealAnswer) btnClass += " correct";
                                        else if (isSelected && !isCorrect) btnClass += " wrong";
                                        else btnClass += " disabled";
                                    }

                                    return (
                                        <button
                                            key={index}
                                            className={btnClass}
                                            onClick={() => !showFeedback && handleAnswer(option)}
                                            disabled={showFeedback}
                                            style={{
                                                padding: '1rem',
                                                borderRadius: '0.75rem',
                                                border: showFeedback ? (isRealAnswer ? '2px solid #22c55e' : (isSelected ? '2px solid #ef4444' : '2px solid #e2e8f0')) : '2px solid #e2e8f0',
                                                background: showFeedback ? (isRealAnswer ? '#f0fdf4' : (isSelected ? '#fef2f2' : '#f8fafc')) : 'white',
                                                color: showFeedback ? (isRealAnswer ? '#15803d' : (isSelected ? '#991b1b' : '#334155')) : '#334155',
                                                cursor: showFeedback ? 'default' : 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                textAlign: 'left',
                                                fontWeight: '500',
                                                transition: 'all 0.2s',
                                                boxShadow: !showFeedback && '0 2px 5px rgba(0,0,0,0.05)'
                                            }}
                                        >
                                            <span style={{
                                                width: '2rem',
                                                height: '2rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: '0.5rem',
                                                background: showFeedback ? (isRealAnswer ? '#bbf7d0' : '#f1f5f9') : '#f1f5f9',
                                                color: showFeedback ? (isRealAnswer ? '#166534' : '#64748b') : '#64748b',
                                                fontWeight: 'bold',
                                                fontSize: '0.875rem'
                                            }}>
                                                {labels[index]}
                                            </span>
                                            <span style={{ flex: 1 }}>{option}</span>
                                            {showFeedback && isRealAnswer && <CheckCircle size={20} color="#16a34a" />}
                                        </button>
                                    );
                                })}
                            </div>

                            {showFeedback && (
                                <div className="feedback-box bounce-in" style={{ marginTop: '1.5rem', padding: '1rem', background: '#0f172a', color: 'white', borderRadius: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                                    <div>
                                        <p style={{ fontWeight: 'bold', color: isCorrect ? '#4ade80' : '#f87171', marginBottom: '0.25rem' }}>
                                            {isCorrect ? 'Tuyệt vời!' : 'Tiếc quá!'}
                                        </p>
                                        <p style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>
                                            {currentQuestion.explanation || ("Đáp án đúng: " + currentQuestion.answer)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={nextQuestion}
                                        style={{ padding: '0.5rem 1rem', background: 'white', color: '#0f172a', borderRadius: '0.5rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                    >
                                        Tiếp tục <ChevronRight size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 2. HOME SCREEN (Mission Hub) - NEW GRID LAYOUT
    return (
        <div className="tasks-page home-screen">
            <div className="tasks-header">
                <h1 className="tasks-title">KHÁM PHÁ ĐÀ NẴNG</h1>
                <p className="tasks-subtitle">Hoàn thành 5 thử thách để trở thành Đại sứ Du lịch nhé!</p>
            </div>

            <div className="missions-grid">
                {missions.map((mission) => {
                    const isLocked = mission.id > unlockedLevel;

                    return (
                        <div
                            key={mission.id}
                            className={`mission-card ${isLocked ? 'locked' : ''}`}
                            onClick={() => handleStartMission(mission)}
                        >
                            <div className={`card-icon-box icon-bg-${(mission.id - 1) % 5 + 1}`}>
                                {isLocked ? <Lock size={32} /> : <mission.icon size={32} />}
                            </div>

                            <div className="card-content">
                                <span className="mission-label">NHIỆM VỤ 0{mission.id}</span>
                                <h3 className="mission-title">{mission.title}</h3>
                                <p className="mission-desc">
                                    {isLocked ? "Hoàn thành nhiệm vụ trước để mở khóa." : mission.description}
                                </p>
                            </div>

                            <div className="card-action">
                                {isLocked ? (
                                    <span className="btn-start" style={{ color: '#94a3b8', cursor: 'not-allowed' }}>
                                        ĐANG KHÓA
                                    </span>
                                ) : (
                                    <button className="btn-start">
                                        CHINH PHỤC NGAY <ChevronRight size={14} strokeWidth={3} />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Tasks;
