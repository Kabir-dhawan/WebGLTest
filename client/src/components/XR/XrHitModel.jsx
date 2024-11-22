import { React, useState, useEffect, useRef } from 'react';
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { useParams } from 'react-router-dom';
import avatarService from '../../services/avatarService';

import XRScene from "./XRScene";

const XrHitModel = () => {
    const [avatars, setAvatars] = useState([]);
    const [sceneId, setSceneId] = useState(1);
    const { session } = useParams();

    const reticleRef = useRef();
    //const [models, setModels] = useState([{ position:[0,1,-2], id : 0, rotationY: 0 }]);
    const [models, setModels] = useState([]);

    const { isPresenting } = useXR();

    const rotationIntervalRef = useRef(null);
    const [rotationY, setRotationY] = useState(0);
    const [placePosition, setPlacePosition] = useState([]);
    const startPoint = useRef(null); // Track start point of swipe
    const endPoint = useRef(null); // Track end point of swipe

    const [isDragging, setIsDragging] = useState(false);
    const dragStartX = useRef(0);
    useEffect(() => {
        console.log("session : ", session);
        if (session) {
            avatarService.getAllAvatarsBySession(session)
                .then(data => {
                    setAvatars(data.data); // Assuming data is an array of avatars
                    console.log("avatars", data.data);
                    if (data.data) {
                        setSceneId(data.data[0].user_scene_id);
                    }
                })
                .catch(error => {
                    console.error('Error fetching avatars:', error);
                });
        }
    }, [session]);

    useThree(({ camera }) => {
        if (!isPresenting) {
            camera.position.z = 3;
        }
    });

    useHitTest((hitMatrix) => {
        if (!reticleRef || !reticleRef.current) return;
        hitMatrix.decompose(
            reticleRef.current.position,
            reticleRef.current.quaternion,
            reticleRef.current.scale
        );

        reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
    });

    const placeModel = (e) => {
      console.log("place model");
        let position = e.intersection.object.position.clone();
        setPlacePosition(position);
        const id = Date.now();
        setModels([{ position, id }]);
    };

    // const startRotation = (e, id) => {
    //   console.log("work start rotation",e);
    //     stopRotation(); // Clear any existing interval
    //     rotationIntervalRef.current = setInterval(() => {
    //         setRotationY(prev => prev + Math.PI / 36  );
    //     }, 100); // Adjust speed here
    // };

    // const startSwipe = (e) => {
    //     startPoint.current = { x: e.clientX, y: e.clientY };
    // };

    // const endSwipe = (e) => {
    //     endPoint.current = { x: e.clientX, y: e.clientY };

    //     if (startPoint.current && endPoint.current) {
    //         const dx = endPoint.current.x - startPoint.current.x;
    //         const dy = endPoint.current.y - startPoint.current.y;

    //         if (Math.abs(dx) > Math.abs(dy)) {
    //             // Horizontal swipe
    //             if (dx > 0) {
    //                 console.log("Swipe Right -> Rotate Clockwise");
    //                 setRotationY((prev) => prev + Math.PI / 12); // Adjust increment
    //             } else {
    //                 console.log("Swipe Left -> Rotate Counterclockwise");
    //                 setRotationY((prev) => prev - Math.PI / 12); // Adjust decrement
    //             }
    //         }
    //     }

    //     // Reset points
    //     startPoint.current = null;
    //     endPoint.current = null;
    // };


    // const rotateClockwise = () => {
    //     stopRotation();
    //     rotationIntervalRef.current = setInterval(() => {
    //         setRotationY((prev) => prev + Math.PI / 8); // Increment rotation
    //     }, 100);
    // };

    // const rotateCounterclockwise = () => {
    //     stopRotation();
    //     rotationIntervalRef.current = setInterval(() => {
    //         setRotationY((prev) => prev - Math.PI / 8); // Decrement rotation
    //     }, 100);
    // };

    // const stopRotation = () => {
    //     console.log("stop rotation");
    //     if (rotationIntervalRef.current) {
    //         clearInterval(rotationIntervalRef.current);
    //         rotationIntervalRef.current = null;
    //     }
    // };

    // useEffect(() => {
    //     // Attach global pointer listeners for swipe detection
    //     window.addEventListener("pointerdown", startSwipe);
    //     window.addEventListener("pointerup", endSwipe);

    //     return () => {
    //         // Cleanup listeners
    //         window.removeEventListener("pointerdown", startSwipe);
    //         window.removeEventListener("pointerup", endSwipe);
    //     };
    // }, []);

    const handlePointerDown = (e) => {
        setIsDragging(true);
        dragStartX.current = e.clientX;
    };

    const handlePointerMove = (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - dragStartX.current;
        setRotationY((prev) => prev + deltaX * 0.01); // Adjust rotation speed
        dragStartX.current = e.clientX; // Update drag start for smoothness
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        // Attach global pointer events for drag functionality
        window.addEventListener("pointerdown", handlePointerDown);
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);

        return () => {
            // Clean up global pointer events
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [isDragging]);

return (
        <group >
            <OrbitControls />
            <ambientLight />
            <group  ref={rotationIntervalRef} rotation={[0, rotationY, 0]} position={placePosition}>
            {isPresenting &&
                models?.map(({  id }) => (
                    <Interactive
                        key={id}                       
                    >
                      <mesh scale={0.1} >
                              <ringGeometry args={[0.1, 0.25, 32]} />
                              <meshStandardMaterial color={"white"} />
                      <XRScene
                             // Apply Y-axis rotation
                            avatars={avatars}
                        />
                      </mesh>
                        
                    </Interactive>
                ))}
            </group>
            {isPresenting && (
                <Interactive onSelect={placeModel}>
                    <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
                        <ringGeometry args={[0.1, 0.25, 32]} />
                        <meshStandardMaterial color={"white"} />
                    </mesh>
                </Interactive>
            )}
            {!isPresenting && <XRScene avatars={avatars} scale={1} />}
        </group>
    );
};

export default XrHitModel;
