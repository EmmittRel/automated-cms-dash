import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WebsitePage = ({ websiteId }) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchContent = async () => {
            const response = await axios.get(`http://localhost:5000/website-content/${websiteId}`);
            setContent(response.data.websiteContent);
        };
        fetchContent();
    }, [websiteId]);

    return (
        <div>
            <h2>Website {websiteId}</h2>
            <p>{content}</p>
        </div>
    );
};

export default WebsitePage;