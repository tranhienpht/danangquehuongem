import React from 'react';
import './LandmarkCard.css';

const LandmarkCard = ({ landmark }) => {
    return (
        <div className="landmark-card">
            <div className="landmark-image">
                <img src={landmark.image} alt={landmark.name} />
            </div>
            <div className="landmark-content">
                <h3>{landmark.name}</h3>
                <p>{landmark.description}</p>
            </div>
        </div>
    );
};

export default LandmarkCard;
