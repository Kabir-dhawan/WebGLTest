import {React, Suspense,  useState, useEffect } from 'react';

import XRAvatar from '../XR/XRAvatar';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AvatarCreator } from '@readyplayerme/react-avatar-creator';
import { useSearchParams } from 'react-router-dom';
import { XR, createXRStore } from '@react-three/xr'


const baseUrl = 'http://localhost:5000/api/v1/getFile?filename=';
const store = createXRStore();
const config = {
    clearCache: false,
    bodyType: 'fullbody',
    quickStart: false,
    language: 'en',
  };
export default function Scene1(){
    //const [avatarUrl, setAvatarUrl] = useState('https://models.readyplayer.me/670e069cb8d37556eaee135d.glb');
    const [avatarUrl, setAvatarUrl] = useState('https://models.readyplayer.me/6729ae725f2ab0f33cad1360.glb');
    const [avatarUrl1, setAvatarUrl1] = useState('https://models.readyplayer.me/6729ad2a9be8279b60db6baa.glb');
    const [avatarUrl2, setAvatarUrl2] = useState('https://models.readyplayer.me/6729dc20c3ce98a01c93c020.glb');
    const [avatarAnimation, setAvatarAnimation] = useState('1');
    const [avatarAnimation1, setAvatarAnimation1] = useState('2');
    const [avatarAnimation2, setAvatarAnimation2] = useState('3');
    const [searchParams] = useSearchParams();
    const [avatarType, setAvatarType]= useState(1);
  
   
     
      
return (<>
    <div className="fixed top-0 left-0 z-10 w-screen h-screen">
        
        {
            <>
         
            <Canvas className="fixed top-0 left-0 z-10 w-screen h-screen" >
            <XR store={store}>
                <Suspense>
                <ambientLight intensity={2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <directionalLight castShadow position={[10, 10, 5]} intensity={1} > </directionalLight>
                <XRAvatar avatarUrl={avatarUrl} position={[-1,1,0]} animationState ={avatarAnimation} />
                <XRAvatar avatarUrl={avatarUrl1} position={[0,1,2]} animationState ={avatarAnimation1}/>
                <XRAvatar avatarUrl={avatarUrl2} position={[1,1,1]} animationState = {avatarAnimation2}/>
                </Suspense>
                <OrbitControls />
            </XR>
            </Canvas>
            </>
        }
        </div>
</>);
};