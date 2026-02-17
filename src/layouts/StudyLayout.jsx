import React from 'react';
import { Outlet } from 'react-router-dom';
import StudySidebar from '../components/StudySidebar';
import './StudyLayout.css';

const StudyLayout = () => {
    return (
        <div className="study-layout">
            <StudySidebar />
            <div className="study-content">
                <Outlet />
            </div>
        </div>
    );
};

export default StudyLayout;
