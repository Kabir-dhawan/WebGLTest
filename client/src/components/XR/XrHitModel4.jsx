import { React, useState, useEffect, useRef } from 'react';
import { useThree } from "@react-three/fiber";
import { Interactive, useXR } from "@react-three/xr";
import { useParams } from 'react-router-dom';
import * as THREE from 'three';
import avatarService from '../../services/avatarService';
import XRScene from "./XRScene";
 
const XrHitModel = () => {
    const [avatars, setAvatars] = useState([]);
    const [sceneId, setSceneId] = useState(1);
    const { session } = useParams();
    const { isPresenting } = useXR();
    const modelRef = useRef(null);
    const rotationYRef = useRef(0); // Ref to store current rotation
    const interactionStateRef = useRef({
        startX: null,
        previousRotation: 0,
        rotationSensitivity: 4,
    });
 
    const modelPosition = new THREE.Vector3(0, 0, -2);
 
    useEffect(() => {
        if (session) {
            avatarService.getAllAvatarsBySession(session)
                .then(data => {
                    setAvatars(data.data);
                    if (data.data?.length > 0) {
                        setSceneId(data.data[0].user_scene_id);
                    }
                })
                .catch(error => console.error('Error fetching avatars:', error));
        }
    }, [session]);
 
    useThree(({ camera }) => {
        if (!isPresenting) {
            camera.position.z = 3;
        }
    });
 
    const onMove = (event) => {
        const intersection = event?.intersection;
        if (!intersection) return;
 
        const currentX = intersection.point.x;
 
        if (interactionStateRef.current.startX === null) {
            // If this is the start of a new interaction
            interactionStateRef.current.startX = currentX;
            return;
        }
 
        const deltaX = currentX - interactionStateRef.current.startX;
        const newRotation = interactionStateRef.current.previousRotation +
            (deltaX * interactionStateRef.current.rotationSensitivity);
 
        rotationYRef.current = newRotation; // Update rotation directly in ref
        if (modelRef.current) {
            modelRef.current.rotation.y = newRotation; // Apply rotation directly
        }
    };
 
    const onSelectEnd = () => {
        // Store the final rotation and reset start position
        interactionStateRef.current.previousRotation = rotationYRef.current;
        interactionStateRef.current.startX = null;
    };
 
    return (
<group>
<ambientLight intensity={1} />
<pointLight position={[10, 10, 10]} intensity={1} />
<directionalLight position={[5, 5, 5]} intensity={0.5} />
 
            {isPresenting ? (
<group position={modelPosition.toArray()} ref={modelRef}>
<Interactive
                        onMove={onMove}
                        onSelectEnd={onSelectEnd}
>
<mesh>
<XRScene avatars={avatars} scale={0.1} />
</mesh>
</Interactive>
</group>
            ) : (
<group ref={modelRef}>
<XRScene avatars={avatars} scale={1} />
</group>
            )}
</group>
    );
};
 
export default XrHitModel;