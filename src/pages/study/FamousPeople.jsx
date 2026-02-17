import React from 'react';
import StoryCard from '../../components/StoryCard';
import { historicalFigures } from '../../data/historyData';
import '../../pages/History.css'; // Reusing existing styles

const FamousPeople = () => {
    return (
        <div className="history-page">
            <header className="page-header history-header">
                <h1>Danh nhân Đà Nẵng</h1>
                <p>Những người con ưu tú của quê hương</p>
            </header>

            <section className="section-container">
                <h2>🦸 Các nhân vật lịch sử tiêu biểu</h2>
                <div className="figures-grid">
                    {historicalFigures.map(figure => (
                        <StoryCard key={figure.id} figure={figure} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FamousPeople;
