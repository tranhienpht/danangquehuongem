import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Award, FileBadge, LogOut, Star } from 'lucide-react';
import './Profile.css';

const Profile = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login', { replace: true });
        }
    }, [currentUser, navigate]);

    async function handleLogout() {
        try {
            await logout();
            navigate('/login');
        } catch {
            console.error('Failed to log out');
        }
    }

    if (!currentUser) return null;

    // Default mock data if Firebase doesn't provide them fully
    const defaultAvatar = "https://cdn3d.iconscout.com/3d/premium/thumb/crab-3d-icon-download-in-png-blend-fbx-gltf-formats--animal-seafood-zodiac-astrology-wild-pack-nature-icons-8374880.png";
    const displayName = currentUser.displayName || "Hoàng Ngọc Thiên Di";

    // Generate a mock ID based on the user's UID to keep it consistent
    const mockId = currentUser.uid ? parseInt(currentUser.uid.replace(/\D/g, '').substring(0, 10)) || 1307893658 : 1307893658;

    // Extract account from email (e.g. thiendi.pht@... -> thiendi.pht)
    const accountName = currentUser.email ? currentUser.email.split('@')[0] : "thiendi.pht";

    return (
        <div className="profile-wrapper">
            <div className="profile-container">

                {/* 1. Header Information Section */}
                <div className="profile-header-card">
                    <img
                        src={currentUser.photoURL || defaultAvatar}
                        alt="User Avatar"
                        className="profile-avatar"
                    />

                    <p className="profile-greeting">Xin chào học sinh !</p>
                    <h1 className="profile-name">{displayName}</h1>

                    <div className="profile-details">
                        <p><strong>ID:</strong> {mockId}</p>
                        <p><strong>Tài khoản:</strong> {accountName}</p>
                    </div>

                    <button className="logout-button" onClick={handleLogout}>
                        <LogOut size={18} /> Đăng xuất
                    </button>
                </div>

                {/* 2. Achievements Section */}
                <div className="profile-section">
                    <h2 className="section-title">
                        <Award className="section-icon" /> Thành tích cá nhân
                    </h2>

                    <div className="achievements-grid">
                        <div className="achievement-card">
                            <div className="ach-icon-wrapper" style={{ background: '#fef3c7' }}>
                                <Star className="ach-icon" style={{ color: '#d97706' }} />
                            </div>
                            <div className="ach-info">
                                <h3>Điểm tích lũy</h3>
                                <p className="ach-value">450 điểm</p>
                            </div>
                        </div>

                        <div className="achievement-card">
                            <div className="ach-icon-wrapper" style={{ background: '#e0e7ff' }}>
                                <Award className="ach-icon" style={{ color: '#4f46e5' }} />
                            </div>
                            <div className="ach-info">
                                <h3>Huy hiệu</h3>
                                <p className="ach-value">8 huy hiệu</p>
                            </div>
                        </div>

                        <div className="achievement-card">
                            <div className="ach-icon-wrapper" style={{ background: '#dcfce7' }}>
                                <FileBadge className="ach-icon" style={{ color: '#16a34a' }} />
                            </div>
                            <div className="ach-info">
                                <h3>Nhiệm vụ</h3>
                                <p className="ach-value">Đã HT 12 NV</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Certificates Section */}
                <div className="profile-section">
                    <h2 className="section-title">
                        <FileBadge className="section-icon" /> Giấy chứng nhận
                    </h2>

                    <div className="certificates-container">
                        <div className="certificate-card empty-state">
                            <img src="https://cdn-icons-png.flaticon.com/512/1006/1006611.png" alt="Diploma" className="cert-placeholder" />
                            <p>Em chưa có giấy chứng nhận nào.</p>
                            <span>Hãy hoàn thành thêm nhiều bài học và thử thách để nhận chứng nhận nhé!</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
