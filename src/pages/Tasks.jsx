import React, { useState, useEffect } from 'react';
import { missions } from '../data/missionsData';
import './Tasks.css';
import QuizModern from '../components/QuizModern';
import QuizCuisine from '../components/QuizCuisine'; // Add the import
import { Lock, ChevronRight } from 'lucide-react';

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
                    <>
                        <button
                            onClick={handleBackToHub}
                            className="absolute top-4 left-4 z-50 bg-white/80 hover:bg-white text-orange-600 font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                        >
                            ← Trở về
                        </button>
                        <iframe
                            src="/danangquehuongem/cooking-game.html"
                            title="Đi Chợ Nấu Ăn"
                            className="w-full h-full border-none"
                            onLoad={(e) => {
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
                    </>
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
                            className={`mission-card ${isLocked ? 'locked' : ''} ${mission.id < unlockedLevel ? 'completed' : ''}`}
                            onClick={() => {
                                if (isLocked || mission.id < unlockedLevel) return;
                                handleStartMission(mission);
                            }}
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
                                ) : mission.id < unlockedLevel ? (
                                    <span className="btn-start" style={{ color: '#10b981', fontWeight: 'bold' }}>
                                        ✓ ĐÃ HOÀN THÀNH
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
