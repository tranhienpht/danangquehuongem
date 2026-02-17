import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { festivalsData } from '../../data/festivalsData';
import './Festivals.css';

const Festivals = () => {
    return (
        <div className="festivals-container">
            <div className="festivals-header">
                <h1>Lễ hội truyền thống</h1>
                <p>Khám phá nét đẹp văn hóa tâm linh của người dân xứ Quảng (nay là Đà Nẵng)</p>
            </div>

            <section className="festivals-intro">

                <p>
                    Đà Nẵng và Quảng Nam (cũ) là vùng đất có nhiều lễ hội truyền thống đặc sắc, gắn liền với cuộc sống của người dân từ xưa đến nay. Mỗi lễ hội đều mang trong mình một câu chuyện, một ước mong tốt đẹp của con người về cuộc sống bình an, mưa thuận gió hòa và gia đình hạnh phúc.
                </p>
                <p>
                    Thông qua các lễ hội, người dân bày tỏ lòng biết ơn đối với thần linh, tổ tiên, cầu mong sức khỏe, mùa màng bội thu và cuộc sống ấm no. Đây cũng là dịp để mọi người gặp gỡ, vui chơi, cùng nhau gìn giữ những nét đẹp văn hóa truyền thống của quê hương.
                </p>
                <p>
                    Ở Đà Nẵng có rất nhiều lễ hội phong phú và ý nghĩa. Có lễ hội gắn với biển cả của ngư dân, có lễ hội mang đậm tín ngưỡng Phật giáo, cũng có lễ hội linh thiêng của vùng sông nước. Mỗi lễ hội đều góp phần tạo nên một bức tranh văn hóa đa dạng, giàu bản sắc của quê hương.
                </p>
                <p>
                    Sau đây, chúng ta cùng tìm hiểu một số lễ hội truyền thống tiêu biểu của Đà Nẵng để hiểu rõ hơn về cuộc sống, niềm tin và những giá trị tốt đẹp của người dân nơi đây nhé!
                </p>
            </section>

            <section className="festivals-category">
                <h2 className="category-title">Lễ hội cấp Quốc gia & Di sản Phi vật thể</h2>
                <div className="festival-grid">
                    {festivalsData.national.map(festival => (
                        <FestivalCard key={festival.id} festival={festival} />
                    ))}
                </div>
            </section>

            <section className="festivals-category">
                <h2 className="category-title">Lễ hội cấp Thành phố & Làng xã</h2>
                <div className="festival-grid">
                    {festivalsData.provincial.map(festival => (
                        <FestivalCard key={festival.id} festival={festival} />
                    ))}
                </div>
            </section>

            <section className="festivals-category">
                <h2 className="category-title">Lễ hội tiêu biểu tại Quảng Nam</h2>
                <div className="festival-grid">
                    {festivalsData.quangnam.map(festival => (
                        <FestivalCard key={festival.id} festival={festival} />
                    ))}
                </div>
            </section>
        </div>
    );
};

const FestivalCard = ({ festival }) => (
    <Link to={`/study/festivals/${festival.id}`} className="festival-card-link">
        <div className="festival-card">
            <div className="festival-content">
                <h3>{festival.name}</h3>
                <div className="festival-time">
                    <Calendar size={16} />
                    <span>{festival.time}</span>
                </div>
                <div className="festival-location">
                    <MapPin size={16} />
                    <span>{festival.location}</span>
                </div>
                <p className="festival-desc">{festival.description}</p>
                {festival.tags.map((tag, index) => (
                    <span key={index} className="festival-tag">{tag}</span>
                ))}
            </div>
        </div>
    </Link>
);

export default Festivals;
