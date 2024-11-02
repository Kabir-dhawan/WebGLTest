import {React, Suspense,  useState, useEffect } from 'react';

import XRAvatar from './XR/XRAvatar';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AvatarCreator } from '@readyplayerme/react-avatar-creator';
import { useSearchParams } from 'react-router-dom';
import { XR, createXRStore } from '@react-three/xr'

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
    const [searchParams] = useSearchParams();
    // Handle avatar creation completion
    const handleAvatarCreated = (url) => {
      console.log("testing next",url);
      let dateText = new Date().toISOString();
      setAvatarUrl(`${url}?${dateText}`);
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

return (<>
    <div className="fixed top-0 left-0 z-10 w-screen h-screen">
        {/* Show the avatar creator if no avatar URL is set */}
        {!avatarUrl && (
            <AvatarCreator
            subdomain="ytgvbhjn"
            //subdomain="gametest-3j77ud"
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
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=> setAvatarUrl('')}> Change Avatar</button>
            {/* <button onClick={() => store.enterAR()}>Enter AR</button> */}
            <Canvas className="fixed top-0 left-0 z-10 w-screen h-screen" >
            <XR store={store}>
                <Suspense>
                <ambientLight intensity={1} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <directionalLight castShadow position={[10, 10, 5]} intensity={1} > </directionalLight>{/*  */}
                {/* <Avatar avatarUrl={avatarUrl} position={[0,0,0]} /> */}
                <XRAvatar avatarUrl={avatarUrl} position={[-1,0,0]} animationState ={1} />
                <XRAvatar avatarUrl={avatarUrl} position={[1,1,1]} animationState ={2}/>
                <XRAvatar avatarUrl={avatarUrl} position={[0,1,2]} animationState = {searchParams.get('action')}/>
                </Suspense>
                <OrbitControls />
            </XR>
            </Canvas>
            </>
        )}
        </div>
</>);
};