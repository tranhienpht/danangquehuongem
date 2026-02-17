import React from 'react';
import LandmarkCard from '../components/LandmarkCard';
import { districts, landmarks, climateInfo } from '../data/geographyData';
import './Geography.css';

const Geography = () => {
    return (
        <div className="geography-page">
            <header className="page-header geography-header">
                <h1>Địa Lý Quê Em</h1>
                <p>Khám phá vùng đất, con người và thiên nhiên tươi đẹp</p>
            </header>

            <section className="section-container">
                <h2>🗺️ Hành Chính</h2>
                <p className="intro-text">Thành phố Đà Nẵng gồm các quận, huyện:</p>
                <div className="districts-grid">
                    {districts.map((district, index) => (
                        <div key={index} className="district-tag">
                            {district}
                        </div>
                    ))}
                </div>
            </section>

            <section className="section-container">
                <h2>🏞️ Danh Lam Thắng Cảnh</h2>
                <div className="landmarks-grid">
                    {landmarks.map(landmark => (
                        <LandmarkCard key={landmark.id} landmark={landmark} />
                    ))}
                </div>
            </section>

            <section className="section-container">
                <h2>🌤️ Khí Hậu & Tự Nhiên</h2>
                <div className="climate-box">
                    <p><strong>Mùa:</strong> {climateInfo.seasons}</p>
                    <p><strong>Nhiệt độ:</strong> {climateInfo.temperature}</p>
                </div>
            </section>
        </div>
    );
};

export default Geography;
