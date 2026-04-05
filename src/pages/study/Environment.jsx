import React from 'react';
import { Leaf, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { environmentData } from '../../data/environmentData';
import '../../pages/History.css';
import './Environment.css';

const Environment = () => {
    return (
        <div className="history-page textbook-style">
            <div className="textbook-container" style={{ maxWidth: '1200px' }}>
                <header className="page-header history-header bg-green-gradient">
                    <h1>Bảo vệ Môi trường</h1>
                    <p>Cùng chung tay xây dựng Đà Nẵng - Thành phố môi trường</p>
                </header>

                <section className="learning-objectives box-shadow-green" style={{ marginBottom: '3rem' }}>
                    <div className="objective-title-env">
                        <Leaf className="env-leaf-icon" />
                        <span>Vì một quê hương Xanh - Sạch - Đẹp</span>
                    </div>
                    <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#4b5563', textAlign: 'justify', margin: 0 }}>
                        Đà Nẵng đang hướng tới mục tiêu xây dựng "Thành phố môi trường". Để làm được điều đó, mỗi người dân, đặc biệt là các bạn học sinh, cần đóng góp những hành động thiết thực. Hãy học cách yêu thương thiên nhiên, bảo vệ hệ sinh thái biển, cứu lấy sự sống của Nữ hoàng linh trưởng Sơn Trà và gìn giữ vẻ đẹp của các di sản lịch sử. Quê hương chỉ thực sự tươi đẹp khi môi trường được chúng ta trân trọng và bảo vệ mỗi ngày.
                    </p>
                </section>
            </div>

            <section className="section-container">
                <h2 className="env-section-title">🌍 Các chủ đề trọng tâm</h2>
                <div className="environment-grid">
                    {environmentData.map(envItem => (
                        <EnvironmentCard key={envItem.id} envItem={envItem} />
                    ))}
                </div>
            </section>
        </div>
    );
};

const EnvironmentCard = ({ envItem }) => (
    <Link to={`/study/environment/${envItem.id}`} className="env-card-link">
        <div className="env-card">
            <div className="env-image">
                <img src={envItem.image} alt={envItem.name} />
                <div className="env-type-badge">{envItem.type}</div>
            </div>
            <div className="env-content">
                <h3>{envItem.name}</h3>
                <p className="env-desc">{envItem.shortDescription}</p>
                
                <div className="env-learn-more">
                    <span>Tìm hiểu hành động</span>
                    <ArrowRight size={18} />
                </div>
            </div>
        </div>
    </Link>
);

export default Environment;
