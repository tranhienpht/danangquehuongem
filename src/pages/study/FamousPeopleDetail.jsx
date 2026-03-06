import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { historicalFigures } from '../../data/historyData';
import '../../pages/History.css';
import './FamousPeopleDetail.css';

const FamousPeopleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the specific figure by id
    const figure = historicalFigures.find(f => f.id.toString() === id);

    if (!figure) {
        return (
            <div className="history-page">
                <section className="section-container" style={{ textAlign: 'center' }}>
                    <h2>Không tìm thấy thông tin danh nhân này.</h2>
                    <button onClick={() => navigate('/study/famous-people')} className="back-link">
                        &lt; Quay lại danh sách
                    </button>
                </section>
            </div>
        );
    }

    return (
        <div className="history-page">
            <header className="page-header history-header">
                <h1>{figure.name}</h1>
                <p>Khám phá người con ưu tú của quê hương Đà Nẵng</p>
            </header>

            <section className="section-container">
                <button onClick={() => navigate(-1)} className="back-link">
                    &lt; Quay lại
                </button>

                <div className="figure-detail-container">
                    <div className="figure-detail-image">
                        <img src={figure.image} alt={figure.name} />
                    </div>
                    <div className="figure-detail-content">
                        <h2>Tóm tắt tiểu sử</h2>
                        {figure.role && <span className="detail-role-badge">{figure.role}</span>}
                        <div className="figure-detail-description">
                            <p>{figure.description}</p>
                            <div className="extra-info-box">
                                <p><strong>📌 Bạn có biết?</strong> Dữ liệu chi tiết về cuộc đời và sự nghiệp của danh nhân {figure.name} đang được tích hợp thêm vào nền tảng. Bạn hãy theo dõi để biết thêm nhiều câu chuyện hay nhé!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FamousPeopleDetail;
