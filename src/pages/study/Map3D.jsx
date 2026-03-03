import React from 'react';
import { Globe } from 'lucide-react';
import './Map3D.css';

const Map3D = () => {
    return (
        <div className="map3d-page">
            <header className="map3d-header">
                <div className="map3d-header-icon">
                    <Globe size={56} color="#fbc02d" strokeWidth={1.5} />
                </div>
                <h1>BẢN ĐỒ 3D</h1>
                <hr />
                <p>Ngắm nhìn Đà Nẵng từ trên cao với công nghệ 3D.</p>
            </header>

            <div className="map3d-content">
                <h2>KHÁM PHÁ QUA GOOGLE EARTH</h2>
                <p>Các em hãy bấm nút dưới đây để xem toàn cảnh Đà Nẵng 3D.</p>

                <a
                    href="https://earth.google.com/web/search/Đà+Nẵng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map3d-btn"
                >
                    <Globe size={20} />
                    Mở Bản Đồ 3D
                </a>
            </div>
        </div>
    );
};

export default Map3D;
