import { React, Suspense, useState, useEffect, useRef } from 'react';
import XRAvatar from '../XR/XRAvatar';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { XR, createXRStore } from '@react-three/xr';

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
    const [avatarUrl1, setAvatarUrl1] = useState('https://models.readyplayer.me/6729ad2a9be8279b60db6baa.glb');
    const [avatarUrl2, setAvatarUrl2] = useState('https://models.readyplayer.me/6729dc20c3ce98a01c93c020.glb');
    const [avatarAnimation, setAvatarAnimation] = useState('1');
    const [avatarAnimation1, setAvatarAnimation1] = useState('2');
    const [avatarAnimation2, setAvatarAnimation2] = useState('3');
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
            if (avatars[2]?.file_name) {
                const url = `${baseUrl}${avatars[2].file_name}`;
                console.log("Setting avatar 3:", url);
                setAvatarUrl2(url);
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
                    position: [4, 1, 4], 
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
                        <XRAvatar 
                            avatarUrl={avatarUrl} 
                            position={[-1, 1, 0]} 
                            animationState={avatarAnimation}
                        />
                        <XRAvatar 
                            avatarUrl={avatarUrl1} 
                            position={[0, 1, 2]} 
                            animationState={avatarAnimation1}
                        />
                        <XRAvatar 
                            avatarUrl={avatarUrl2} 
                            position={[1, 1, 1]} 
                            animationState={avatarAnimation2}
                        />
                        <CameraController />
                    </Suspense>
                </XR>
            </Canvas>
        </div>
    );
}