import React, { useState, useEffect } from 'react';
import { missions } from '../data/missionsData';
import './Tasks.css';
import QuizModern from '../components/QuizModern';
import { Lock, Unlock } from 'lucide-react';

const Tasks = () => {
    const [unlockedLevel, setUnlockedLevel] = useState(1);
    const [playingMission, setPlayingMission] = useState(null);

    // Initial Load
    useEffect(() => {
        const savedLevel = localStorage.getItem('mission_unlocked_level');
        if (savedLevel) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUnlockedLevel(parseInt(savedLevel));
        }
    }, []);

    const handleStartMission = (mission) => {
        if (mission.id > unlockedLevel) return;
        setPlayingMission(mission);
    };

    const handleBackToHub = () => {
        setPlayingMission(null);
    };

    // --- RENDER ---

    // 1. GAME VIEW (Quiz + Result)
    if (playingMission) {
        return (
            <div className="tasks-page h-screen w-full flex flex-col items-center justify-center p-0 m-0 overflow-hidden bg-slate-50 relative">
                {playingMission.id === 3 ? (
                    <div className="absolute inset-0 w-full h-full bg-white z-40">
                        <button
                            onClick={handleBackToHub}
                            className="absolute top-4 left-4 z-50 bg-white/90 hover:bg-white text-orange-600 font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 border-2 border-orange-200"
                        >
                            ← Trở về
                        </button>
                        <iframe
                            src={`${import.meta.env.BASE_URL}cooking-game.html`}
                            title="Đi Chợ Nấu Ăn"
                            className="w-full h-full border-none block"
                            onLoad={() => {
                                // Add listener for complete message from iframe
                                const handleMessage = (event) => {
                                    if (event.data === 'cooking-game-complete') {
                                        if (playingMission.id === unlockedLevel && unlockedLevel < missions.length + 1) {
                                            const nextLevel = unlockedLevel + 1;
                                            setUnlockedLevel(nextLevel);
                                            localStorage.setItem('mission_unlocked_level', nextLevel);
                                        }
                                        window.removeEventListener('message', handleMessage);
                                        handleBackToHub();
                                    }
                                };
                                window.addEventListener('message', handleMessage);
                                // Clean up on unmount or when playingMission changes
                                return () => window.removeEventListener('message', handleMessage);
                            }}
                        />
                    </div>
                ) : (
                    <QuizModern
                        mission={playingMission}
                        onBack={handleBackToHub}
                        onComplete={(success) => {
                            if (success && playingMission.id === unlockedLevel && unlockedLevel < missions.length + 1) {
                                const nextLevel = unlockedLevel + 1;
                                setUnlockedLevel(nextLevel);
                                localStorage.setItem('mission_unlocked_level', nextLevel);
                            }
                        }}
                    />
                )}
            </div>
        );
    }

    // 2. HOME SCREEN (Mission Hub) - NEW LIST LAYOUT
    return (
        <div className="tasks-page home-screen">
            <div className="tasks-header">
                <h1 className="tasks-title">KHÁM PHÁ ĐÀ NẴNG</h1>
                <p className="tasks-subtitle">Hoàn thành 5 thử thách để trở thành Đại sứ Du lịch nhé!</p>
            </div>

            <div className="missions-list">
                {missions.map((mission) => {
                    const isLocked = mission.id > unlockedLevel;

                    return (
                        <div
                            key={mission.id}
                            className={`mission-row row-${mission.id} ${isLocked ? 'locked' : ''} ${mission.id < unlockedLevel ? 'completed' : ''}`}
                            onClick={() => {
                                if (isLocked || mission.id < unlockedLevel) return;
                                handleStartMission(mission);
                            }}
                        >
                            <div className="mission-left">
                                <span className="mission-text">NHIỆM VỤ</span>
                                <div className="mission-number-wrapper">
                                    <div className="mission-number">0{mission.id}</div>
                                </div>
                            </div>

                            <div className="mission-right">
                                <h3 className="mission-title-row">{mission.title.toUpperCase()}</h3>
                                <div className="mission-status-row">
                                    {isLocked ? (
                                        <>
                                            <Lock size={16} /> <span>Đang khoá</span>
                                        </>
                                    ) : mission.id < unlockedLevel ? (
                                        <>
                                            <Unlock size={16} /> <span>Đã hoàn thành</span>
                                        </>
                                    ) : (
                                        <>
                                            <Unlock size={16} /> <span>Chinh phục ngay!</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Tasks;
