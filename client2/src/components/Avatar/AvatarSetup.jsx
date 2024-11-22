import { AvatarCreator } from '@readyplayerme/react-avatar-creator';

import { useState } from "react";

const config = {
  clearCache: true,
  bodyType: 'fullbody',
  quickStart: false,
  language: 'en',
};

const style = { width: '100%', height: '100vh', border: 'none' };

export default function AvatarSetup() {
  const [avatarUrl, setAvatarUrl] = useState('');
  const handleOnAvatarExported = ( event ) => {
    setAvatarUrl(event.data.url);
  };

  return (
      <>
        <AvatarCreator subdomain="ytgvbhjn" 
        config={config} 
         className="fixed top-0 left-0 z-10 w-screen h-screen"
        onAvatarExported={handleOnAvatarExported} />
        
      </>
  );
}