// src/components/AvatarList.js
import React, { useEffect, useState } from 'react';
import avatarService from '../services/avatarService';

const AvatarList = () => {
    const [avatars, setAvatars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        avatarService.getAllAvatars()
            .then(data => {
                setAvatars(data.data); // Assuming the API response structure
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Avatar List</h1>
            <ul>
                {avatars.map(avatar => (
                    <li key={avatar.id}>{avatar.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default AvatarList;
