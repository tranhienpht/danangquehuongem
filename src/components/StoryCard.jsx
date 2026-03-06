import React from 'react';
import { Link } from 'react-router-dom';
import './StoryCard.css';

const StoryCard = ({ figure }) => {
    return (
        <Link to={`/study/famous-people/${figure.id}`} className="story-card">
            <div className="story-image">
                <img src={figure.image} alt={figure.name} />
            </div>
            <div className="story-content">
                <h3>{figure.name}</h3>
                {figure.role && <span className="role-badge">{figure.role}</span>}
                <p>{figure.description}</p>
            </div>
        </Link>
    );
};

export default StoryCard;
