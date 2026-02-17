import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
            <h1>😕 404 - Không tìm thấy trang</h1>
            <p>Có vẻ như em đã đi lạc rồi!</p>
            <Link to="/" style={{
                display: 'inline-block',
                marginTop: '1rem',
                padding: '0.8rem 1.5rem',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '50px'
            }}>
                Quay về Trang Chủ
            </Link>
        </div>
    );
};

export default NotFound;
