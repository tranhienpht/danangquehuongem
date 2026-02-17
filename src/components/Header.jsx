import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Flag, Award, SquarePen, User } from 'lucide-react';
import './Header.css';

const Header = () => {
    return (
        <header className="main-header">
            <div className="logo">
                <div className="logo-icon">📍</div> {/* Placeholder for logo icon */}
                <h1>ĐÀ NẴNG QUÊ HƯƠNG EM</h1>
            </div>
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
