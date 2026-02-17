import React from 'react';
import './Cuisine.css';

const Cuisine = () => {
    const objectives = [
        "Nhận biết được một số món ăn đặc sản tiêu biểu của Đà Nẵng – Quảng Nam (cũ).",
        "Hiểu nguồn gốc đơn giản và đặc điểm nổi bật của mỗi món.",
        "Biết trân trọng, tự hào và giữ gìn văn hóa ẩm thực quê hương."
    ];

    const dishes = [
        {
            name: "Mì Quảng",
            icon: "🍜",
            details: [
                "Mì Quảng là món ăn nổi tiếng của Đà Nẵng – Quảng Nam (cũ)",
                "Món ăn gồm sợi mì, tôm, thịt, trứng, rau sống và nước dùng đậm vị.",
                "Mì Quảng thường được ăn trong bữa sáng hoặc những dịp sum họp gia đình."
            ]
        },
        {
            name: "Bánh Xèo",
            icon: "🥞",
            details: [
                "Bánh xèo là món bánh được làm từ bột gạo, nhân tôm thịt và giá đỗ.",
                "Bánh được đổ trên chảo nóng, có màu vàng đẹp mắt.",
                "Khi ăn, bánh xèo được cuốn với rau sống và chấm nước mắm."
            ]
        },
        {
            name: "Bánh tráng thịt heo",
            icon: "🥓",
            details: [
                "Bánh tráng thịt heo là món ăn quen thuộc của người dân Đà Nẵng.",
                "Món ăn gồm bánh tráng, thịt heo luộc, rau sống và mắm nêm.",
                "Đây là món ăn thường xuất hiện trong bữa ăn gia đình hoặc khi đãi khách."
            ]
        },
        {
            name: "Bún chả cá Đà Nẵng",
            icon: "🥣",
            details: [
                "Bún chả cá là món ăn quen thuộc của người dân Đà Nẵng.",
                "Món ăn có nước dùng trong, ngọt từ cá, ăn kèm chả cá và rau sống.",
                "Đây là món ăn thường được dùng vào buổi sáng."
            ]
        },
        {
            name: "Cao lầu",
            icon: "🍜",
            details: [
                "Cao lầu là món ăn đặc trưng của vùng Quảng Nam (nay là Đà nẵng)",
                "Sợi cao lầu dai, ăn cùng thịt xá xíu, rau sống và nước sốt đậm đà.",
                "Món ăn gắn với phố cổ Hội An."
            ]
        },
        {
            name: "Bánh mì Đà Nẵng",
            icon: "🥖",
            details: [
                "Bánh mì Đà Nẵng nổi tiếng với nhân đầy đặn, nước sốt đậm vị.",
                "Bánh mì được nhiều người yêu thích vì tiện lợi và ngon miệng.",
                "Đây là món ăn thường ngày quen thuộc trong đời sống hằng ngày."
            ]
        }
    ];

    return (
        <div className="cuisine-page">
            <header className="cuisine-header">
                <div className="header-content">
                    <h1>Ẩm thực Đà Nẵng</h1>
                    <p>Hương vị đậm đà, khó quên của người miền Trung</p>
                </div>
            </header>

            <section className="section-container">
                <h2>🎯 MỤC TIÊU</h2>
                <div className="objective-list">
                    <ul>
                        {objectives.map((obj, index) => (
                            <li key={index}>{obj}</li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="section-container">
                <h2>Giới thiệu</h2>
                <p className="intro-text">
                    Ẩm thực Đà Nẵng mang hương vị đặc trưng của vùng Bắc Trung Bộ và Nam Trung Bộ, giản dị mà đậm đà.
                    Mỗi món ăn không chỉ ngon miệng mà còn thể hiện nét văn hóa và đời sống của người dân địa phương.
                    Sự phong phú của ẩm thực nơi đây đã để lại ấn tượng sâu sắc với du khách. Một số món tiêu biểu gồm:
                </p>
            </section>

            <section className="section-container">
                <h2>Các món ăn tiêu biểu</h2>
                <div className="dishes-grid">
                    {dishes.map((dish, index) => (
                        <div key={index} className="dish-card">
                            <span className="dish-icon">{dish.icon}</span>
                            <h3>{dish.name}</h3>
                            <ul>
                                {dish.details.map((detail, idx) => (
                                    <li key={idx}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Cuisine;
