import React, { useEffect, useState } from 'react';
import avatarService from '../../services/avatarService';

//const baseUrl = 'http://localhost:5000/api/v1/getFile?filename=';
const baseUrl = '';

const AvatarList = ({ onAvatarClick, avatars = [] }) => {
    const [avatars, setAvatars] = useState(avatars);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        avatarService.getAllAvatars()
            .then(data => {
                console.log(data.data);
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
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Avatar List</h1>
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                <ul className="flex space-x-4">
                    {avatars.map(avatar => (
                        <li key={avatar.id} className="shrink-0" onClick={() => onAvatarClick(avatar)}>
                            <img
                                src={`${baseUrl}${avatar.image_url}`}
                                alt="Avatar"
                                className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AvatarList;
