import {Suspense,  useState, useEffect } from 'react';
import './App.css';
import Avatar from './components/Avatar';
import Avatar2 from './components/Avatar2';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { AvatarCreator } from '@readyplayerme/react-avatar-creator';

function App() {
  const [avatarUrl, setAvatarUrl] = useState('https://models.readyplayer.me/670e069cb8d37556eaee135d.glb');

  // Handle avatar creation completion
  const handleAvatarCreated = (url) => {
    console.log("testing next",url);
    setAvatarUrl(url);
  };

  return (
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
        <Canvas className="fixed top-0 left-0 z-10 w-screen h-screen" 
          camera={{ position: [0, 3, 3] }}>
          <Suspense>
            <ambientLight intensity={1} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <directionalLight castShadow position={[10, 10, 5]} intensity={1} > </directionalLight>{/*  */}
            {/* <Avatar avatarUrl={avatarUrl} position={[0,0,0]} /> */}
            <Avatar2 position={[-1,0,0]} animationState ={1} />
            <Avatar2 position={[1,1,1]} animationState ={2}/>
            <Avatar2 position={[0,1,2]} />
          </Suspense>
          <OrbitControls />
        </Canvas>
      )}
    </div>
  );
}

export default App;