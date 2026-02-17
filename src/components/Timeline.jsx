import React from 'react';
import './Timeline.css';

const Timeline = ({ events }) => {
    return (
        <div className="timeline-container">
            <div className="timeline-line"></div>
            {events.map((event, index) => (
                <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                        <h3 className="timeline-year">{event.year}</h3>
                        <h4>{event.title}</h4>
                        <p>{event.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Timeline;
