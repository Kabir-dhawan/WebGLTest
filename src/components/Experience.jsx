import {React, Suspense,  useState, useEffect } from 'react';

import XRAvatar from './XR/XRAvatar';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AvatarCreator } from '@readyplayerme/react-avatar-creator';
import { useSearchParams } from 'react-router-dom';
import { XR, createXRStore } from '@react-three/xr'

const store = createXRStore();

export default function Experience(){
    const [avatarUrl, setAvatarUrl] = useState('https://models.readyplayer.me/670e069cb8d37556eaee135d.glb');
    const [searchParams] = useSearchParams();
    // Handle avatar creation completion
    const handleAvatarCreated = (url) => {
      console.log("testing next",url);
      setAvatarUrl(url);
    };
return (<>
    <div className="fixed top-0 left-0 z-10 w-screen h-screen">
        {/* Show the avatar creator if no avatar URL is set */}
        {!avatarUrl && (
            <AvatarCreator
            subdomain="ytgvbhjn"
            className="fixed top-0 left-0 z-10 w-screen h-screen"
            onAvatarCreated={(event) => {
                handleAvatarCreated( event.data.url);
            }}
            onClose={() => { /* Handle closing the avatar creator (optional) */ }}
            />
        )}

        {/* Show the avatar if an avatar URL is available */}
        {avatarUrl && (
            <>
            <button onClick={() => store.enterAR()}>Enter AR</button>
            <Canvas className="fixed top-0 left-0 z-10 w-screen h-screen" >
            <XR store={store}>
                <Suspense>
                <ambientLight intensity={1} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <directionalLight castShadow position={[10, 10, 5]} intensity={1} > </directionalLight>{/*  */}
                {/* <Avatar avatarUrl={avatarUrl} position={[0,0,0]} /> */}
                <XRAvatar position={[-1,0,0]} animationState ={1} />
                <XRAvatar position={[1,1,1]} animationState ={2}/>
                <XRAvatar position={[0,1,2]} animationState = {searchParams.get('action')}/>
                </Suspense>
                <OrbitControls />
            </XR>
            </Canvas>
            </>
        )}
        </div>
</>);
};