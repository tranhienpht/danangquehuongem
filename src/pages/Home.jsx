import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Chào mừng các em đến với Đà Nẵng</h1>
                    <p className="subtitle">Khám phá vẻ đẹp, lịch sử và con người của thành phố đáng sống!</p>
                    <Link to="/study" className="cta-button">Bắt đầu hành trình</Link>
                </div>
            </section>

            <section className="intro-section">
                <h2>Đà Nẵng - Quảng Nam: Vươn mình ra biển lớn</h2>
                <p>
                    Từ ngày 1/7/2025, tỉnh Quảng Nam và thành phố Đà Nẵng đã chính thức sáp nhập, tạo nên một
                    siêu đô thị biển miền Trung. Quê hương chúng ta giờ đây rộng lớn hơn, giàu đẹp hơn với sự kết hợp
                    giữa sự năng động của Đà Nẵng và bề dày văn hóa của Quảng Nam. Hãy cùng khám phá vùng đất mới này nhé!
                </p>

                <div className="features-grid">
                    <div className="feature-card history">
                        <h3>📜 Lịch Sử</h3>
                        <p>Những câu chuyện hào hùng về các anh hùng dân tộc.</p>
                        <Link to="/study/famous-people">Khám phá ngay</Link>
                    </div>
                    <div className="feature-card geography">
                        <h3>🗺️ Địa Lý</h3>
                        <p>Tìm hiểu về núi, sông, biển và các quận huyện.</p>
                        <Link to="/study/nature">Xem bản đồ</Link>
                    </div>
                    <div className="feature-card quiz">
                        <h3>🎮 Trò Chơi</h3>
                        <p>Vừa học vừa chơi với những câu đố thú vị.</p>
                        <Link to="/quiz">Chơi ngay</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
