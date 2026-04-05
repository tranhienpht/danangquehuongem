import React from 'react';
import StoryCard from '../../components/StoryCard';
import { historicalFigures } from '../../data/historyData';
import '../../pages/History.css'; // Reusing existing styles
import './Nature.css'; // Import Nature styles for the objective box

const FamousPeople = () => {
    return (
        <div className="history-page textbook-style">
            <div className="textbook-container" style={{ maxWidth: '1200px' }}>
                <header className="page-header history-header">
                    <h1>Danh nhân Đà Nẵng</h1>
                    <p>Những người con ưu tú của quê hương</p>
                </header>

                <section className="learning-objectives box-shadow-yellow" style={{ marginBottom: '3rem' }}>
                    <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#4b5563', textAlign: 'justify', margin: 0 }}>
                        Đà Nẵng là vùng đất giàu truyền thống lịch sử, tự hào là quê hương của nhiều danh nhân tiêu biểu với lòng yêu nước nồng nàn. Họ là những con người kiên cường, bền bỉ, luôn vượt qua khó khăn và đặt lợi ích của Tổ quốc lên trên hết. Tiêu biểu như Huỳnh Thúc Kháng, Nguyễn Tri Phương, Phan Châu Trinh, Nguyễn Văn Thoại, Lê Văn Hiến,... những người đã có nhiều đóng góp quan trọng trong sự nghiệp bảo vệ và xây dựng đất nước. Tên tuổi của họ đã làm rạng danh quê hương Đà Nẵng. Các danh nhân ấy mãi là niềm tự hào của quê hương. Thế hệ hôm nay cần noi gương, học tập tinh thần yêu nước và ý chí vươn lên của họ để trở thành những công dân có ích cho xã hội.
                    </p>
                </section>
            </div>

            <section className="section-container">
                <h2>🦸 Các nhân vật lịch sử tiêu biểu</h2>
                <div className="figures-grid">
                    {historicalFigures.map(figure => (
                        <StoryCard key={figure.id} figure={figure} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FamousPeople;
