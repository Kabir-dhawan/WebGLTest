import { React, useState } from 'react';
import { AvatarCreator } from '@readyplayerme/react-avatar-creator';
import avatarService from '../services/avatarService';
import AvatarList from './Avatar/AvatarList';
import Scene1 from './Scene/Scene1';

const baseUrl = 'http://localhost:5000/api/v1/getFile?filename=';

export default function Experience() {
    const [avatarUrl, setAvatarUrl] = useState('');
    const [avatarType, setAvatarType] = useState(1);
    const [avatars, setAvatars] = useState([
        { file_name: '6729ae725f2ab0f33cad1360.glb' },
        { file_name: '6729ad2a9be8279b60db6baa.glb' },
        { file_name: '6729dc20c3ce98a01c93c020.glb' },
    ]);

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
        });
        avatarService.uploadAvatar(url).then(()=>{
        // Update avatars array with the newly created avatar
        setAvatars(prevAvatars => {
          const newAvatars = [...prevAvatars];
          newAvatars[avatarType - 1] = { file_name: filenameWithExtension }; // Update with object structure
          return newAvatars;
        });

        });

       
    };

    const onAvatarSelection = (avatar) => {
      try {
          // Update avatars array with the selected avatar
          setAvatars(prevAvatars => {
              const newAvatars = [...prevAvatars];
              newAvatars[avatarType - 1] = { file_name: avatar.file_name };
              console.log('Updated avatars after selection:', newAvatars);
              return newAvatars;
          });

          // Update the current avatarUrl
          setAvatarUrl(`${baseUrl}${avatar.file_name}`);
      } catch (error) {
          console.error('Error selecting avatar:', error);
      }
  };

    const handleSelectChange = (e) => {
        const newType = Number(e.target.value);
        setAvatarType(newType);
    };

    // Extract rpm_ids for Scene1
    const avatarUrls = avatars.map(avatar => avatar.rpm_id);
    
    const getAvatarUrl = function(avatarId){
      return `${baseUrl}${avatarId}`;
    }  
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
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setAvatarUrl('')}>
                        Create Avatar
                    </button>
                    
                    <AvatarList onAvatarClick={onAvatarSelection} />
                    
                    <select 
                        onChange={handleSelectChange} 
                        value={avatarType} 
                        className="mt-4"
                    >
                        <option value="1">Actor 1</option>
                        <option value="2">Actor 2</option>
                        <option value="3">Actor 3</option>
                    </select>

                    <div className="mt-4">
                        <Scene1 avatars={avatars} isFull={false} />
                    </div>
                </>
            )}
        </div>
    );
}