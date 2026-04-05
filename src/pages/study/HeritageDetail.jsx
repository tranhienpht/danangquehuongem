import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, CheckCircle, Info } from 'lucide-react';
import { heritageData } from '../../data/heritageData';
import '../../pages/History.css';
import './Nature.css';
import './HeritageDetail.css';

const HeritageDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const heritage = heritageData.find(h => h.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!heritage) {
        return (
            <div className="history-page textbook-style" style={{ padding: '4rem', textAlign: 'center' }}>
                <h2>Không tìm thấy bài học</h2>
                <button onClick={() => navigate('/study/heritage')} className="back-btn" style={{ marginTop: '1rem' }}>
                    <ArrowLeft size={20} /> Quay lại
                </button>
            </div>
        );
    }

    return (
        <div className="history-page textbook-style">
            <div className="textbook-container" style={{ maxWidth: '900px' }}>
                <Link to="/study/heritage" className="back-btn">
                    <ArrowLeft size={20} />
                    <span>Quay lại Danh sách Di sản</span>
                </Link>

                <header className="page-header history-header heritage-detail-header">
                    <div className="heritage-badge">{heritage.type}</div>
                    <h1>{heritage.name}</h1>
                    <div className="heritage-meta">
                        <MapPin size={20} className="meta-icon" />
                        <span>{heritage.location}</span>
                    </div>
                </header>

                <div className="hero-image-container box-shadow-yellow">
                    <img src={heritage.image} alt={heritage.name} className="hero-image" />
                </div>

                <section className="lesson-content warm-up-section">
                    <div className="section-title-wrapper">
                        <div className="title-accent-bar yellow-bar"></div>
                        <h2 className="section-title">Khám phá Di sản</h2>
                    </div>
                    
                    <div className="info-box box-shadow-blue">
                        <h4 className="info-box-title">Giới thiệu chung</h4>
                        <p className="paragraph-text mb-0">{heritage.details}</p>
                    </div>
                </section>

                <section className="lesson-content">
                    <div className="section-title-wrapper">
                        <div className="title-accent-bar" style={{ backgroundColor: '#eab308' }}></div>
                        <h2 className="section-title">Giá trị Lịch sử & Văn hóa</h2>
                    </div>
                    
                    <div className="learning-objectives box-shadow-yellow">
                        <ul className="objective-list-custom">
                            {heritage.historicalSignificance.map((point, index) => (
                                <li key={index}>
                                    <span className="point-text">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                <div className="lesson-footer">
                    <p className="italic-text text-center">
                        Hãy luôn tự hào và chung tay Bảo vệ các di sản quý giá của quê hương chúng ta nhé!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeritageDetail;
