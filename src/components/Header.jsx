import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Home, BookOpen, Flag, Award, SquarePen, User, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header = () => {
    const { currentUser } = useAuth();
    return (
        <header className="main-header">
            <Link to="/" className="logo">
                <img src="/images/logo-danang.svg" alt="Logo Đà Nẵng" className="logo-image" />
                <h1>ĐÀ NẴNG QUÊ HƯƠNG EM</h1>
            </Link>
            <nav>
                <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Home size={24} />
                    <span>TRANG CHỦ</span>
                </NavLink>
                <NavLink to="/study" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <BookOpen size={24} />
                    <span>GÓC HỌC TẬP</span>
                </NavLink>
                <NavLink to="/tasks" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Flag size={24} />
                    <span>NHIỆM VỤ</span>
                </NavLink>
                <NavLink to="/quiz" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <Award size={24} />
                    <span>KIỂM TRA</span>
                </NavLink>
                <NavLink to="/share" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <SquarePen size={24} />
                    <span>CHIA SẺ</span>
                </NavLink>
                <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <User size={24} />
                    <span>HỒ SƠ</span>
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;
