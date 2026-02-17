import React from 'react';
import './StoryCard.css';

const StoryCard = ({ figure }) => {
    return (
        <div className="story-card">
            <div className="story-image">
                <img src={figure.image} alt={figure.name} />
            </div>
            <div className="story-content">
                <h3>{figure.name}</h3>
                {figure.role && <span className="role-badge">{figure.role}</span>}
                <p>{figure.description}</p>
            </div>
        </div>
    );
};

export default StoryCard;
