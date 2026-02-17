import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { festivalsData } from '../../data/festivalsData';
import './FestivalDetail.css';

const FestivalDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the festival in the data
    const findFestival = (id) => {
        const allFestivals = [
            ...festivalsData.national,
            ...festivalsData.provincial,
            ...festivalsData.quangnam
        ];
        return allFestivals.find(f => f.id === id);
    };

    const festival = findFestival(id);

    if (!festival) {
        return (
            <div className="festival-detail-container error">
                <h2>Không tìm thấy lễ hội!</h2>
                <button onClick={() => navigate('/study/festivals')}>Quay lại</button>
            </div>
        );
    }

    return (
        <div className="festival-detail-container">
            <button className="back-button" onClick={() => navigate('/study/festivals')}>
                <ArrowLeft size={20} /> Quay lại danh sách lễ hội
            </button>

            <div className="festival-detail-header">
                <h1 className="detail-title">{festival.name}</h1>
                <div className="detail-meta">
                    <div className="meta-item">
                        <Calendar size={18} />
                        <span>{festival.time}</span>
                    </div>
                    <div className="meta-item">
                        <MapPin size={18} />
                        <span>{festival.location}</span>
                    </div>
                </div>
                <div className="detail-tags">
                    {festival.tags.map((tag, index) => (
                        <span key={index} className="detail-tag">{tag}</span>
                    ))}
                </div>
            </div>

            <div className="festival-detail-content">
                {/* Render the initial description if no specific detail content exists */}
                {(!festival.detailContent || festival.detailContent.length === 0) && (
                    <p className="intro-text">{festival.description}</p>
                )}

                {/* Render detailed content blocks */}
                {festival.detailContent && festival.detailContent.map((block, index) => {
                    if (block.type === 'paragraph') {
                        return <p key={index} className="detail-paragraph">{block.content}</p>;
                    } else if (block.type === 'image') {
                        return (
                            <div key={index} className="detail-image-container">
                                <img src={block.src} alt={block.alt} className="detail-image" />
                                {block.caption && <p className="image-caption">{block.caption}</p>}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default FestivalDetail;
