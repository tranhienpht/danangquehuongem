import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckSquare, Heart } from 'lucide-react';
import { environmentData } from '../../data/environmentData';
import '../../pages/History.css';
import './Nature.css';
import './EnvironmentDetail.css';

const EnvironmentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const envItem = environmentData.find(e => e.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!envItem) {
        return (
            <div className="history-page textbook-style" style={{ padding: '4rem', textAlign: 'center' }}>
                <h2>Không tìm thấy bài học</h2>
                <button onClick={() => navigate('/study/environment')} className="back-btn-env" style={{ marginTop: '1rem' }}>
                    <ArrowLeft size={20} /> Quay lại
                </button>
            </div>
        );
    }

    return (
        <div className="history-page textbook-style">
            <div className="textbook-container" style={{ maxWidth: '900px' }}>
                <Link to="/study/environment" className="back-btn-env">
                    <ArrowLeft size={20} />
                    <span>Quay lại Môi trường</span>
                </Link>

                <header className="page-header history-header env-detail-header bg-green-gradient">
                    <div className="env-detail-badge">{envItem.type}</div>
                    <h1>{envItem.name}</h1>
                </header>

                <div className="env-hero-image-container box-shadow-green">
                    <img src={`/${envItem.image}`} alt={envItem.name} className="env-hero-image" />
                </div>

                <div className="env-message-quote box-shadow-green">
                    <Heart className="quote-icon" size={28} />
                    <p>{envItem.message}</p>
                </div>

                <section className="lesson-content warm-up-section mt-8">
                    <div className="section-title-wrapper">
                        <div className="title-accent-bar" style={{ backgroundColor: '#f59e0b' }}></div>
                        <h2 className="section-title" style={{ color: '#d97706' }}>Vì sao phải bảo vệ?</h2>
                    </div>
                    
                    <div className="info-box env-warning-box">
                        <div className="env-box-header">
                            <AlertTriangle size={24} className="warning-icon" />
                            <h4 className="env-box-title">Thực trạng & Trách nhiệm</h4>
                        </div>
                        <p className="paragraph-text mb-0">{envItem.whyMatters}</p>
                    </div>
                    
                    <div className="env-secondary-image-container mt-6">
                        <img 
                            src={`/${envItem.secondaryImage}`} 
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `/${envItem.image}`;
                            }}
                            alt={`${envItem.name} minh họa thực trạng`} 
                            className="env-secondary-image box-shadow-green" 
                        />
                    </div>
                </section>

                <section className="lesson-content mt-8">
                    <div className="section-title-wrapper">
                        <div className="title-accent-bar" style={{ backgroundColor: '#10b981' }}></div>
                        <h2 className="section-title" style={{ color: '#059669' }}>Hành động của em</h2>
                    </div>
                    
                    <div className="learning-objectives box-shadow-green">
                        <ul className="env-action-list">
                            {envItem.actions.map((action, index) => (
                                <li key={index}>
                                    <CheckSquare size={20} className="action-check-icon" />
                                    <span className="action-text">{action}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default EnvironmentDetail;
