/* eslint-disable */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, ArrowRight, Sparkles, BookOpen, GraduationCap } from 'lucide-react';
import './Login.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, signup, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await signup(email, password);
            }
            navigate('/');
        } catch (err) {
            setError(isLogin ? 'Không thể đăng nhập. Vui lòng kiểm tra lại tài khoản!' : 'Lỗi khi tạo tài khoản. Mật khẩu phải từ 6 ký tự.');
            console.error(err);
        }

        setLoading(false);
    }

    async function handleGoogleLogin() {
        try {
            setError('');
            setLoading(true);
            await loginWithGoogle();
            navigate('/');
        } catch (err) {
            setError('Lỗi khi đăng nhập Google.');
            console.error(err);
        }
        setLoading(false);
    }

    const quickLogin = async (role) => {
        // Mock emails and passwords for quick login demonstration
        let targetEmail = role === 'teacher' ? 'giaovien@danang.edu.vn' : 'hocsinh@danang.edu.vn';
        let targetPass = '123456';

        setError('');
        setLoading(true);
        try {
            await login(targetEmail, targetPass);
            navigate('/');
        } catch (err) {
            // If accounts don't exist yet, we can create them on the fly for the sake of demo:
            try {
                await signup(targetEmail, targetPass);
                navigate('/');
            } catch (signupErr) {
                setError('Lối đăng nhập nhanh không khả dụng.');
                console.error(signupErr);
            }
        }
        setLoading(false);
    };

    return (
        <div className="login-wrapper">
            {/* Left Side: Branding */}
            <div className="login-brand-panel">
                <div className="brand-content">
                    <div className="logo-box">ĐN</div>
                    <h1 className="brand-title">ĐÀ NẴNG<br />QUÊ HƯƠNG EM</h1>

                    <div className="brand-divider"></div>

                    <h2 className="brand-subtitle">
                        TÀI LIỆU GIÁO DỤC ĐỊA PHƯƠNG 4<br />
                        <span className="subtitle-highlight">THÀNH PHỐ ĐÀ NẴNG</span>
                    </h2>

                    <p className="brand-quote">
                        “Hành trình khám phá lịch sử, địa lý<br />
                        và những nét đẹp văn hóa đặc sắc của thành phố Đà Nẵng.”
                    </p>

                    <div className="brand-icons">
                        <Sparkles size={24} />
                        <BookOpen size={24} />
                        <GraduationCap size={24} />
                    </div>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="login-form-panel">
                <div className="form-content-inner">
                    <h2 className="form-main-title">{isLogin ? 'TRẢI NGHIỆM NGAY!' : 'TẠO TÀI KHOẢN!'}</h2>
                    <p className="form-sub-text">Em hãy điền thông tin để bắt đầu hành trình học tập!</p>

                    {error && <div className="login-error-msg">{error}</div>}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="input-group">
                            <label>TÊN ĐĂNG NHẬP (EMAIL)</label>
                            <div className="input-wrapper">
                                <Mail size={18} className="input-icon" />
                                <input
                                    type="email"
                                    placeholder="an@gmail.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>MẬT KHẨU</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button disabled={loading} type="submit" className={isLogin ? "submit-auth-btn" : "submit-auth-btn register"}>
                            {isLogin ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'} <ArrowRight size={20} className="arrow-icon" />
                        </button>
                    </form>

                    <p className="toggle-auth-link">
                        {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
                        <span onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập ngay'}
                        </span>
                    </p>

                    <div className="section-divider google-divider">
                        <span>HOẶC</span>
                    </div>

                    <button
                        disabled={loading}
                        onClick={handleGoogleLogin}
                        className="google-auth-btn"
                    >
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" />
                        Tiếp tục với Google
                    </button>

                    {isLogin && (
                        <div className="quick-login-section">
                            <div className="section-divider">
                                <span>ĐĂNG NHẬP NHANH (TÀI KHOẢN MẪU)</span>
                            </div>

                            <button className="quick-acc-btn" onClick={() => quickLogin('teacher')} disabled={loading}>
                                <div className="quick-avatar teacher-avatar">👩‍🏫</div>
                                <div className="quick-info">
                                    <span className="quick-name">GIÁO VIÊN</span>
                                    <span className="quick-role">GIÁO VIÊN</span>
                                </div>
                            </button>

                            <button className="quick-acc-btn" onClick={() => quickLogin('student')} disabled={loading}>
                                <div className="quick-avatar student-avatar">👦</div>
                                <div className="quick-info">
                                    <span className="quick-name">NGUYỄN VĂN AN</span>
                                    <span className="quick-role">HỌC SINH</span>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
