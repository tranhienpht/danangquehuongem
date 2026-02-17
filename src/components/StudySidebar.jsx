import React from 'react';
import { NavLink } from 'react-router-dom';
import { Map, Mountain, PartyPopper, Utensils, Users, Landmark, Leaf } from 'lucide-react';
import './StudySidebar.css';

const StudySidebar = () => {
    const menuItems = [
        { path: '/study/nature', label: 'Địa lý & Thiên nhiên', icon: <Mountain size={20} /> },
        { path: '/study/map3d', label: 'Bản đồ 3D', icon: <Map size={20} /> },
        { path: '/study/festivals', label: 'Lễ hội truyền thống', icon: <PartyPopper size={20} /> },
        { path: '/study/cuisine', label: 'Ẩm thực', icon: <Utensils size={20} /> },
        { path: '/study/famous-people', label: 'Danh nhân', icon: <Users size={20} /> },
        { path: '/study/heritage', label: 'Di sản Đà Nẵng', icon: <Landmark size={20} /> },
        { path: '/study/environment', label: 'Bảo vệ môi trường', icon: <Leaf size={20} /> },
    ];

    return (
        <aside className="study-sidebar">
            <div className="sidebar-header">
                <h3>Bản đồ tri thức</h3>
            </div>
            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                    >
                        <span className="icon">{item.icon}</span>
                        <span className="label">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default StudySidebar;
