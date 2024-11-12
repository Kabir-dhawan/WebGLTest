import { React, useState } from 'react';
import { AvatarCreator } from '@readyplayerme/react-avatar-creator';
import avatarService from '../services/avatarService';
import AvatarList from './Avatar/AvatarList';
import Scene1 from './Scene/Scene1';
import Scene2 from './Scene/Scene2';
import QRCode from "react-qr-code";


const baseUrl = 'http://localhost:5000/api/v1/getFile?filename=';

export default function Experience() {
    const [avatarUrl, setAvatarUrl] = useState('');
    const [avatarType, setAvatarType] = useState(1);
    const [sceneId, setSceneId] = useState(1);
    const [avatars, setAvatars] = useState([
        {id:1, file_name: '6729ad2a9be8279b60db6baa.glb' },
        { id:1,file_name: '6729ad2a9be8279b60db6baa.glb' },
        { id:1,file_name: '6729ad2a9be8279b60db6baa.glb' },
    ]);
    const [qrValue, setQRValue] = useState('');

    const handleAvatarCreated = (url) => {
        const dateText = new Date().toISOString();
        setAvatarUrl(`${url}?${dateText}`);
        const filenameWithExtension = new URL(url).pathname.split('/').pop();
        const filenameWithoutExtension = filenameWithExtension.split('.').slice(0, -1).join('.');

        // Create and upload avatar
        avatarService.createAvatar({
            image_url: `https://models.readyplayer.me/${filenameWithoutExtension}.png`,
            avatar_url: url,
            rpm_id: filenameWithoutExtension,
            file_name: filenameWithExtension
        }).then(res=> {
            console.log("after creation of avatar",res);
            avatarService.uploadAvatar(url).then(()=>{          })
            .finally(()=>{
                setAvatars(prevAvatars => {
                    const newAvatars = [...prevAvatars];
                    
                    newAvatars[avatarType - 1] = {
                        id : res?.data?.id,
                         file_name: filenameWithExtension 
                        }; // Update with object structure
                    return newAvatars;
                    });
            });
           

        });

        //console.log("after creation of avatar",tempData);
       
        
       
    };

    const onAvatarSelection = (avatar) => {
       
      try {
        console.log("selection", avatar);
          // Update avatars array with the selected avatar
          setAvatars(prevAvatars => {
              const newAvatars = [...prevAvatars];
              newAvatars[avatarType - 1] = {
                    id : avatar.id, 
                    file_name: avatar.file_name
                 };
              //console.log('Updated avatars after selection:', newAvatars);
              return newAvatars;
          });

          // Update the current avatarUrl
          setAvatarUrl(`${baseUrl}${avatar.file_name}`);
      } catch (error) {
          console.error('Error selecting avatar:', error);
      }
  };

    const handleSelectChange = (e) => {
        e.preventDefault();
        const newType = Number(e.target.value);
        setAvatarType(newType);
        setQRValue('');
    };

    const handleSceneChange = (e) => {
        e.preventDefault();
        const newScene = Number(e.target.value);
        setSceneId(newScene);
        setQRValue('');
    };

    // Extract rpm_ids for Scene1
    const avatarUrls = avatars.map(avatar => avatar.rpm_id);

    const handleCreateSession = () => {
        console.log("avatars", avatars);
        const sessionData = {
            userSceneId: sceneId, // example userSceneId, replace as needed
            qrCodeUrl: 'http://localhost:5173/WebGLTest/scene', // replace with actual QR code URL if applicable
            qrCodeExpiration: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
            avatars: avatars.map((avatar, index) => ({
                avatarId: avatar.id, // assuming avatar object includes an ID, adjust as needed
                actorId: index + 1 // example actorId, replace as needed
            }))
        };

        avatarService.createSessionWithAvatars(sessionData)
            .then(response => {
                console.log('Session created successfully:', response);
                const session = response.data.session[0];
                setQRValue(`${session.qr_code_url}/${session.session_id}`);
            })
            .catch(error => {
                console.error('Error creating session:', error);
            });
    };

    const getAvatarUrl = function(avatarId){
      return `${baseUrl}${avatarId}`;
    } ; 

    const selectScene = ()=>{
        switch(sceneId){
            case 1:
                return <Scene1 avatars={avatars}/>;
                break;
            case 2:
                    return <Scene2 avatars={avatars}/>;
                    break;
        }
    };
    return (
        <div className="fixed top-0 left-0 z-10 w-screen h-screen">
            {!avatarUrl && (
                <AvatarCreator
                    subdomain="gametest-3j77ud"
                    config={{
                        clearCache: false,
                        bodyType: 'fullbody',
                        quickStart: false,
                        language: 'en',
                    }}
                    className="fixed top-0 left-0 z-10 w-screen h-screen"
                    onAvatarExported={(event) => handleAvatarCreated(event.data.url)}
                />
            )}

            {avatarUrl && (
                <>
                    
                    
                    <AvatarList onAvatarClick={onAvatarSelection} />
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4"
                        onClick={() => setAvatarUrl('')}>
                        Create Avatar
                    </button>
                    <select 
                         onChange={handleSceneChange}
                         value={sceneId} 
                        className="bg-green-500 mt-4 py-2 px-4" >
                        <option value="1">Scene 1</option>
                        <option value="2">Scene 2</option>
                    </select>
                    <select 
                        onChange={handleSelectChange} 
                        value={avatarType} 
                        className="bg-green-500 mt-4 py-2 px-4"
                    >
                        <option value="1">Actor 1</option>
                        <option value="2">Actor 2</option>
                        <option value="3">Actor 3</option>
                    </select>
                    <button
                        className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
                        onClick={handleCreateSession}>
                        Create QR
                    </button>
                    <div className="text-center">
                        <span className="text-black">{qrValue}</span>
                    </div>
                    
                   
                    
                    <div className="mt-4">
                        {/* <Scene2 avatars={avatars} isFull={false} /> */}
                       { selectScene()}
                    </div>

                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 hover:bg-green-700 text-white font-bold py-1 px-1 rounded"  >
                        
                        <QRCode size={128}
                                value={qrValue}
                                viewBox={`0 0 128 128`}
                        />
                    
                    </div>
                </>
            )}
        </div>
    );
}