import React from 'react';
import LandmarkCard from '../../components/LandmarkCard';
import { districts, landmarks, climateInfo } from '../../data/geographyData';
import './Nature.css';

const Nature = () => {
    return (
        <div className="nature-page">
            <header className="nature-header">
                <div className="header-content">
                    <h1>Địa lý & Thiên nhiên</h1>
                    <p>Khám phá vùng đất Đà Nẵng - Quảng Nam rộng lớn và tươi đẹp</p>
                </div>
            </header>

            <section className="section-container">
                <h2>🗺️ Hành Chính</h2>
                <p className="intro-text">Thành phố mới bao gồm các quận, huyện:</p>
                <div className="districts-grid">
                    {districts.map((district, index) => (
                        <div key={index} className="district-tag">
                            {district}
                        </div>
                    ))}
                </div>
                <div className="map-illustration">
                    <img src="/assets/map_danang.png" alt="Bản đồ hành chính Đà Nẵng - Quảng Nam" />
                    <p className="caption">Sơ đồ hành chính thành phố Đà Nẵng mở rộng</p>
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

export default Nature;
