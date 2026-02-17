import React from 'react';
import Timeline from '../components/Timeline';
import StoryCard from '../components/StoryCard';
import { timelineEvents, historicalFigures } from '../data/historyData';
import './History.css';

const History = () => {
    return (
        <div className="history-page">
            <header className="page-header history-header">
                <h1>Lịch Sử Quê Em</h1>
                <p>Cùng tìm hiểu về quá trình hình thành và phát triển của Đà Nẵng</p>
            </header>

            <section className="section-container">
                <h2>📅 Mốc Thời Gian Quan Trọng</h2>
                <Timeline events={timelineEvents} />
            </section>

            <section className="section-container">
                <h2>🦸 Nhân vật Lịch Sử</h2>
                <div className="figures-grid">
                    {historicalFigures.map(figure => (
                        <StoryCard key={figure.id} figure={figure} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default History;
