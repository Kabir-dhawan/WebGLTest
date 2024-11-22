import {React, Suspense,  useState, useEffect } from 'react';
import Scene1 from './Scene1';
import Scene2 from './Scene2';
import { useParams } from 'react-router-dom';
import avatarService from '../../services/avatarService';

const baseUrl = 'https://localhost:5000/api/v1/getFile?filename=';

export default function SceneManager(){
    const [avatars, setAvatars] = useState([]);
    const [sceneId, setSceneId] = useState(1);
    //const [searchParams] = useSearchParams();
    const { session } = useParams();

    useEffect(() => {
        console.log("session : ", session);
        if (session) {
            avatarService.getAllAvatarsBySession(session)
                .then(data => {
                    setAvatars(data.data); // Assuming data is an array of avatars
                    console.log("avatars", data.data);
                    if(data.data){
                        setSceneId(data.data[0].user_scene_id);
                    }
                })
                .catch(error => {
                    console.error('Error fetching avatars:', error);
                });
        }
    }, [session]);

    const selectScene = ()=>{
        switch(sceneId){
            case 1:
                return <Scene1 avatars={avatars}/>;
                
            case 2:
                return <Scene2 avatars={avatars}/>;
                
        }
    };
    return <>
     
      <button onClick={() => store.enterAR()}>Enter AR</button> 
        {selectScene()}
    </>;
}