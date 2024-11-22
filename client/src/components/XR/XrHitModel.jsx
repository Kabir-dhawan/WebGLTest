import { React, useState, useEffect, useRef } from 'react';
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { useParams } from 'react-router-dom';
import * as THREE from 'three';
import avatarService from '../../services/avatarService';
import XRScene from "./XRScene";

const XrHitModel = () => {
    const [avatars, setAvatars] = useState([]);
    const [sceneId, setSceneId] = useState(1);
    const { session } = useParams();
    const reticleRef = useRef();
    const [models, setModels] = useState([]);
    const { isPresenting } = useXR();
    const [rotationY, setRotationY] = useState(0);
    const [placePosition, setPlacePosition] = useState(new THREE.Vector3());
    const [trackerColor, setTrackerColor] = useState("white");
    const [isPlaced, setIsPlaced] = useState(false);
    const lastHitRef = useRef(null);
    const debugRef = useRef({ lastEvent: null });

    useEffect(() => {
        if (session) {
            avatarService.getAllAvatarsBySession(session)
                .then(data => {
                    setAvatars(data.data);
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

    useHitTest((hitMatrix, hit) => {
        if (!reticleRef.current || isPlaced) return;

        const hitPosition = new THREE.Vector3();
        const hitQuaternion = new THREE.Quaternion();
        const hitScale = new THREE.Vector3();

        hitMatrix.decompose(hitPosition, hitQuaternion, hitScale);
        lastHitRef.current = hitPosition.clone();
        
        reticleRef.current.position.copy(hitPosition);
        reticleRef.current.quaternion.copy(hitQuaternion);
        reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
        reticleRef.current.visible = true;
    });

    const handlePlaceModel = (event) => {
        console.log('Place Model Event:', event);
        if (isPlaced || !lastHitRef.current) return;
        
        const position = lastHitRef.current;
        setPlacePosition(position);
        setModels([{ position, id: Date.now() }]);
        setIsPlaced(true);

        if (reticleRef.current) {
            reticleRef.current.visible = false;
        }
        console.log('Model Placed');
    };

    // Log every XR event for debugging
    const logXREvent = (eventName, event) => {
        console.log(`XR Event - ${eventName}:`, {
            event,
            controller: event?.controller,
            hitTest: event?.intersection,
            timestamp: new Date().toISOString()
        });
        debugRef.current.lastEvent = eventName;
    };

    const onSelect = (event) => {
        logXREvent('onSelect', event);
        if (!isPlaced) return;
        setRotationY(prev => prev + 0.1);
    };

    const onHover = (event) => {
        logXREvent('onHover', event);
    };

    const onBlur = (event) => {
        logXREvent('onBlur', event);
    };

    const onSelectStart = (event) => {
        logXREvent('onSelectStart', event);
    };

    const onSelectEnd = (event) => {
        logXREvent('onSelectEnd', event);
    };

    const onSqueezeStart = (event) => {
        logXREvent('onSqueezeStart', event);
    };

    const onSqueezeEnd = (event) => {
        logXREvent('onSqueezeEnd', event);
    };

    const onMove = (event) => {
        logXREvent('onMove', event);
        if (!isPlaced) return;
        setRotationY(prev => prev + 0.1);
    };

    return (
        <group>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} />

            {isPresenting && (
                <>
                    {isPlaced ? (
                        <group position={placePosition.toArray()}>
                            <group rotation-y={rotationY}>
                                <Interactive
                                    onSelect={onSelect}
                                    onSelectStart={onSelectStart}
                                    onSelectEnd={onSelectEnd}
                                    onSqueezeStart={onSqueezeStart}
                                    onSqueezeEnd={onSqueezeEnd}
                                    onHover={onHover}
                                    onBlur={onBlur}
                                    onMove={onMove}
                                >
                                    <mesh scale={[1, 1, 1]}>
                                        <boxGeometry args={[1, 1, 1]} />
                                        <meshStandardMaterial visible={false} />
                                        <XRScene avatars={avatars} scale={0.1} />
                                    </mesh>
                                </Interactive>
                            </group>
                        </group>
                    ) : (
                        <Interactive 
                            onSelect={handlePlaceModel}
                            onSelectStart={(event) => {
                                logXREvent('PlacementStart', event);
                                setTrackerColor("red");
                            }}
                            onSelectEnd={(event) => {
                                logXREvent('PlacementEnd', event);
                                setTrackerColor("white");
                            }}
                        >
                            <mesh 
                                ref={reticleRef}
                                rotation-x={-Math.PI / 2}
                            >
                                <ringGeometry args={[0.1, 0.25, 32]} />
                                <meshStandardMaterial 
                                    color={trackerColor}
                                    transparent
                                    opacity={0.8}
                                    side={THREE.DoubleSide}
                                    emissive={trackerColor}
                                    emissiveIntensity={0.5}
                                />
                            </mesh>
                        </Interactive>
                    )}
                </>
            )}

            {!isPresenting && (
                <group rotation-y={rotationY}>
                    <XRScene avatars={avatars} scale={1} />
                </group>
            )}
        </group>
    );
};

export default XrHitModel;