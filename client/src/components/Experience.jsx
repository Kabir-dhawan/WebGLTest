import {React, Suspense,  useState, useEffect } from 'react';

import XRAvatar from './XR/XRAvatar';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AvatarCreator } from '@readyplayerme/react-avatar-creator';
import { useSearchParams } from 'react-router-dom';
import { XR, createXRStore } from '@react-three/xr'
import avatarService from '../services/avatarService';
import AvatarList from './AvatarList';

const baseUrl = 'http://localhost:5000/api/v1/getFile?filename=';
const store = createXRStore();
const config = {
    clearCache: false,
    bodyType: 'fullbody',
    quickStart: false,
    language: 'en',
  };
export default function Experience(){
    //const [avatarUrl, setAvatarUrl] = useState('https://models.readyplayer.me/670e069cb8d37556eaee135d.glb');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [avatarUrl1, setAvatarUrl1] = useState('https://models.readyplayer.me/6729ad2a9be8279b60db6baa.glb');
    const [avatarUrl2, setAvatarUrl2] = useState('https://models.readyplayer.me/6729ad2a9be8279b60db6baa.glb');
    const [avatarAnimation, setAvatarAnimation] = useState('1');
    const [avatarAnimation1, setAvatarAnimation1] = useState('2');
    const [avatarAnimation2, setAvatarAnimation2] = useState('3');
    const [searchParams] = useSearchParams();
    const [avatarType, setAvatarType]= useState(1);
    // Handle avatar creation completion
    const handleAvatarCreated = (url) => {
      console.log("testing next",url);
      let dateText = new Date().toISOString();
      setAvatarUrl(`${url}?${dateText}`);
      const filenameWithExtension = new URL(url).pathname.split('/').pop();
      const filenameWithoutExtension = filenameWithExtension.split('.').slice(0, -1).join('.');

      avatarService.createAvatar({
                                  image_url: 'https://models.readyplayer.me/'+filenameWithoutExtension+'.png',
                                  avatar_url : url,
                                  rpm_id: filenameWithoutExtension, 
                                  file_name:filenameWithExtension
                                });
      avatarService.uploadAvatar(url);
    };

    const handleOnUserSet = (event) => {
        console.log(`User ID is: ${event.data.id}`);
      };
    
      const handleOnAvatarExported = (event) => {
        console.log(`Avatar URL is: ${event.data.url}`);
      };
    
      const handleUserAuthorized = (event) => {
        console.log(`User is:`, event.data);
      };
    
      const handleAssetUnlocked = (event) => {
        console.log(`Asset unlocked is: ${event.data.assetId}`);
      };
      const onAvatarSelection = (avatar) => {
        console.log(`User ID is: ${avatar.id}`, avatar);
        let avatarUrl = `${baseUrl}${avatar.file_name}&${new Date().toISOString()}` ;
        if(avatarType == 1)
        {
          setAvatarUrl(avatarUrl);
          setAvatarAnimation(1);
        }
        if(avatarType == 2)
         { setAvatarUrl1(avatarUrl); setAvatarAnimation1(2);}
        if(avatarType == 3)
          {setAvatarUrl2(avatarUrl); setAvatarAnimation2(3);}

        
      };
      const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setAvatarType(1);
        if (selectedValue === '1') {
          setAvatarType(1);
        } else if (selectedValue === '2') {
          setAvatarType(2);
        }else if (selectedValue === '3') {
          setAvatarType(3);
        }
    };
return (<>
    <div className="fixed top-0 left-0 z-10 w-screen h-screen">
        {/* Show the avatar creator if no avatar URL is set */}
        {!avatarUrl && (
            <AvatarCreator
            //subdomain="ytgvbhjn"
            subdomain="gametest-3j77ud"
            //subdomain="demo"
            config={config} 
            className="fixed top-0 left-0 z-10 w-screen h-screen"
            onAvatarExported={(event) => {
                console.log("Avatar creation testing");
                handleAvatarCreated( event.data.url);
            }}
            onUserAuthorized={handleUserAuthorized}
            onAssetUnlock={handleAssetUnlocked}
            onUserSet={handleOnUserSet}
            />
        )}

        {/* Show the avatar if an avatar URL is available */}
        {avatarUrl && (
            <>
            <select onChange={handleSelectChange}>
                            <option value="1">Avatar 1</option>
                            <option value="2">Avatar 2</option>
                            <option value="3">Avatar 3</option>
            </select>
            <AvatarList onAvatarClick={onAvatarSelection}/>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=> setAvatarUrl('')}> Create Avatar</button>
            {/* <button onClick={() => store.enterAR()}>Enter AR</button> */}
            <Canvas className="fixed top-0 left-0 z-10 w-screen h-screen" >
            <XR store={store}>
                <Suspense>
                <ambientLight intensity={2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <directionalLight castShadow position={[10, 10, 5]} intensity={1} > </directionalLight>{/*  */}
                {/* <Avatar avatarUrl={avatarUrl} position={[0,0,0]} /> */}
                <XRAvatar avatarUrl={avatarUrl} position={[-1,1,0]} animationState ={avatarAnimation} />
                <XRAvatar avatarUrl={avatarUrl1} position={[0,1,2]} animationState ={avatarAnimation1}/>
                <XRAvatar avatarUrl={avatarUrl2} position={[1,1,1]} animationState = {avatarAnimation2}/>
                </Suspense>
                <OrbitControls />
            </XR>
            </Canvas>
            </>
        )}
        </div>
</>);
};