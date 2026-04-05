import React from 'react';
import { Landmark, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { heritageData } from '../../data/heritageData';
import '../../pages/History.css';
import './Nature.css';
import './Heritage.css';

const Heritage = () => {
    return (
        <div className="history-page textbook-style">
            <div className="textbook-container" style={{ maxWidth: '1200px' }}>
                <header className="page-header history-header">
                    <h1>Di sản Đà Nẵng & Lân cận</h1>
                    <p>Khám phá những giá trị văn hóa, lịch sử quý báu của quê hương</p>
                </header>

                <section className="learning-objectives box-shadow-yellow" style={{ marginBottom: '3rem' }}>
                    <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#4b5563', textAlign: 'justify', margin: 0 }}>
                        Đà Nẵng là vùng đất giàu giá trị văn hóa, nổi tiếng với nhiều di sản đặc sắc. Nơi đây có thể kể đến một số di sản tiêu biểu như Phố cổ Hội An, Thánh địa Mỹ Sơn, Ngũ Hành Sơn và Ma Nhai Ngũ Hành Sơn,... Các di sản này không chỉ mang giá trị lịch sử, văn hóa sâu sắc mà còn góp phần làm phong phú thêm bản sắc của quê hương. Đây là niềm tự hào của người dân địa phương và là điểm đến hấp dẫn đối với du khách trong và ngoài nước. Vì vậy, mỗi chúng ta cần có ý thức giữ gìn và bảo vệ các di sản quý báu ấy cho các thế hệ mai sau.
                    </p>
                </section>
            </div>

            <section className="section-container">
                <h2>🏛️ Các di sản tiêu biểu</h2>
                <div className="heritage-grid">
                    {heritageData.map(heritage => (
                        <HeritageCard key={heritage.id} heritage={heritage} />
                    ))}
                </div>
            </section>
        </div>
    );
};

const HeritageCard = ({ heritage }) => (
    <Link to={`/study/heritage/${heritage.id}`} className="heritage-card-link">
        <div className="heritage-card">
            <div className="heritage-image">
                <img src={heritage.image} alt={heritage.name} />
                <div className="heritage-type-badge">{heritage.type}</div>
            </div>
            <div className="heritage-content">
                <h3>{heritage.name}</h3>
                <div className="heritage-location">
                    <MapPin size={16} />
                    <span>{heritage.location}</span>
                </div>
                <p className="heritage-desc">{heritage.shortDescription}</p>
            </div>
        </div>
    </Link>
);

export default Heritage;
