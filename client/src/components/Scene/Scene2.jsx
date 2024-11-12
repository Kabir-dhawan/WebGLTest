import { React, Suspense, useState, useEffect, useRef } from 'react';
import XRAvatar from '../XR/XRAvatar';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { XR, createXRStore } from '@react-three/xr';
import Env1 from './Env1';

const baseUrl = 'http://localhost:5000/api/v1/getFile?filename=';
const store = createXRStore();

// Camera Controller component to set initial rotation
function CameraController() {
    const { camera } = useThree();
    const controlsRef = useRef();

    useEffect(() => {
        if (controlsRef.current) {
            // Set initial camera position
            camera.position.set(5, 2, 5);
            
            // Set initial rotation
            controlsRef.current.setAzimuthalAngle(Math.PI/6 ); // 45 degrees horizontal
            controlsRef.current.setPolarAngle(Math.PI / 2);     // 60 degrees vertical
            
            // Update the controls
            controlsRef.current.update();
        }
    }, [camera]);

    return (
        <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.5}
            panSpeed={0.5}
            rotateSpeed={0.5}
            minDistance={2}
            maxDistance={10}
            minPolarAngle={Math.PI / 4}    // 45 degrees
            maxPolarAngle={Math.PI / 2}    // 90 degrees
            minAzimuthAngle={-Math.PI / 2} // -90 degrees
            maxAzimuthAngle={Math.PI / 2}  // 90 degrees
            target={[0, 1, 0]}
        />
    );
}

export default function Scene1({ avatars = [], isFull = false }) {
    const [avatarUrl, setAvatarUrl] = useState('https://models.readyplayer.me/6729ae725f2ab0f33cad1360.glb');
    const [avatarUrl1, setAvatarUrl1] = useState('https://models.readyplayer.me/6729ae725f2ab0f33cad1360.glb');
    const [avatarAnimation, setAvatarAnimation] = useState('3');
    const [avatarAnimation1, setAvatarAnimation1] = useState('3');
    const [isFullSetting, setIsFullSetting] = useState(isFull);

    useEffect(() => {
        console.log("Scene1 received avatars:", avatars);
        if (Array.isArray(avatars) && avatars.length > 0) {
            if (avatars[0]?.file_name) {
                const url = `${baseUrl}${avatars[0].file_name}`;
                console.log("Setting avatar 1:", url);
                setAvatarUrl(url);
            }
            if (avatars[1]?.file_name) {
                const url = `${baseUrl}${avatars[1].file_name}`;
                console.log("Setting avatar 2:", url);
                setAvatarUrl1(url);
            }
        }
    }, [avatars]);

    useEffect(() => {
        setIsFullSetting(isFull);
    }, [isFull]);

    return (
        <div className={ 'w-full h-screen'}>
            <Canvas 
                className={isFullSetting ? 'top-0 left-0 w-full h-screen' : ''} 
                camera={{ 
                    position: [1, 2, 0], 
                    fov: 50,
                    near: 0.5,
                    far: 1000
                }}
            >
                <XR store={store}>
                    <Suspense>
                        <ambientLight intensity={2} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                        <directionalLight 
                            castShadow 
                            position={[10, 10, 5]} 
                            intensity={1}
                        />
                        <Env1  position={[0,1, 1.5]}/>
                        <XRAvatar 
                            avatarUrl={avatarUrl} 
                            position={[-0.9, 0.90, 0]} 
                            animationState={avatarAnimation}
                        />
                        <XRAvatar 
                            avatarUrl={avatarUrl1} 
                            position={[0.5, 1, 2.5]} 
                            rotation={[0, 180 , 0]}
                            animationState={avatarAnimation1}
                        />
                       
                        <CameraController />
                    </Suspense>
                </XR>
            </Canvas>
        </div>
    );
}