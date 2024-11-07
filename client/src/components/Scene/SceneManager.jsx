import {React, Suspense,  useState, useEffect } from 'react';
import Scene1 from './Scene1';
import { useSearchParams } from 'react-router-dom';

const baseUrl = 'http://localhost:5000/api/v1/getFile?filename=';

export default function SceneManager(){
    const [avatars, setAvatars] = useState([]);
    const [searchParams] = useSearchParams();
    const session = searchParams.get('session');

    useEffect(() => {
        if (session) {s
            avatarService.getAllAvatarsBySession(session)
                .then(data => {
                    setAvatars(data); // Assuming data is an array of avatars
                })
                .catch(error => {
                    console.error('Error fetching avatars:', error);
                });
        }
    }, [session]);

    return(<>
    
    <Scene1 avatars={avatars}/>
    </>);
}