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
    const [rotationY, setRotationY] = useState(0);

    const interactionStateRef = useRef({
        lastX: null,
        rotationSensitivity: 2
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
        const { lastX, rotationSensitivity } = interactionStateRef.current;

        if (lastX !== null) {
            const deltaX = currentX - lastX;
            setRotationY(prev => prev + (deltaX * rotationSensitivity));
            console.log("Moving", deltaX);
        }

        // Update last position
        interactionStateRef.current.lastX = currentX;
        console.log("Move event", currentX);
    };

    const onSelectEnd = () => {
        interactionStateRef.current.lastX = null;
        console.log("Select End");
    };

    return (
        <group>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} />

            {isPresenting ? (
                <group position={modelPosition.toArray()} ref={modelRef}>
                    <group rotation-y={rotationY}>
                        <Interactive 
                            onMove={onMove}
                            onSelectEnd={onSelectEnd}
                        >
                            <mesh>
                                <boxGeometry args={[1, 1, 1]} />
                                <meshStandardMaterial visible={false} />
                                <XRScene avatars={avatars} scale={0.1} />
                            </mesh>
                        </Interactive>
                    </group>
                </group>
            ) : (
                <group rotation-y={rotationY}>
                    <XRScene avatars={avatars} scale={1} />
                </group>
            )}
        </group>
    );
};

export default XrHitModel;