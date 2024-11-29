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
    const [models, setModels] = useState([{ position:[0,2,2], id: Date.now() }]);
    const { isPresenting } = useXR();
    const [rotationY, setRotationY] = useState(0);
    const [placePosition, setPlacePosition] = useState(new THREE.Vector3(0,1,-2));
    const [trackerColor, setTrackerColor] = useState("white");
    const [isPlaced, setIsPlaced] = useState(true);
    const lastHitRef = useRef(null);
    const debugRef = useRef({ lastEvent: null });
    const interactionStateRef = useRef({
        isRotating: false,
        startPoint: null,
        lastPoint: null,
        baseRotation: 0,
        rotationSensitivity: 5 // Adjust this value to control rotation speed
    });
    const modelRef = useRef(null);

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
        if (!reticleRef || !reticleRef.current) return;
        hitMatrix.decompose(
            reticleRef.current.position,
            reticleRef.current.quaternion,
            reticleRef.current.scale
        );

        reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
        
        setPlacePosition(reticleRef.current.position);
        setModels([{ position : reticleRef.current.position, id: Date.now() }]);
        // if (!reticleRef.current || isPlaced) return;

        // const hitPosition = new THREE.Vector3();
        // const hitQuaternion = new THREE.Quaternion();
        // const hitScale = new THREE.Vector3();

        // hitMatrix.decompose(hitPosition, hitQuaternion, hitScale);
        // lastHitRef.current = hitPosition.clone();
        
        // reticleRef.current.position.copy(hitPosition);
        // reticleRef.current.quaternion.copy(hitQuaternion);
        // reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
        // reticleRef.current.visible = true;
    });

    const handlePlaceModel = (event) => {
        console.log('Place Model Event:', event);
        //if (isPlaced || !lastHitRef.current) return;
        
        let position = event.intersection.object.position.clone();
        setPlacePosition(position);
        setModels([{ position, id: Date.now() }]);
        // const position = lastHitRef.current;
        // setPlacePosition(position);
        // setModels([{ position, id: Date.now() }]);
         setIsPlaced(true);

        // if (reticleRef.current) {
        //     reticleRef.current.visible = false;
        // }
        console.log('Model Placed', position);
    };

    const logXREvent = (eventName, event) => {
        console.log(`XR Event - ${eventName}:`, {
            event,
            intersection: event?.intersection,
            timestamp: new Date().toISOString()
        });
    };

    const onSelect = (event) => {
        if (!isPlaced || !modelRef.current) return;
        
        const intersection = event?.intersection;
        if (!intersection) return;

        interactionStateRef.current = {
            ...interactionStateRef.current,
            isRotating: true,
            startPoint: new THREE.Vector2(intersection.point.x, intersection.point.z),
            lastPoint: new THREE.Vector2(intersection.point.x, intersection.point.z),
            baseRotation: rotationY
        };
        
        logXREvent('onSelect', event);
    };

    const onSelectEnd = (event) => {
        interactionStateRef.current.isRotating = false;
        logXREvent('onSelectEnd', event);
    };

    const onMove = (event) => {
        if (!isPlaced || !interactionStateRef.current.isRotating) return;

        const intersection = event?.intersection;
        if (!intersection) return;

        const currentPoint = new THREE.Vector2(intersection.point.x, intersection.point.z);
        const lastPoint = interactionStateRef.current.lastPoint;
        const startPoint = interactionStateRef.current.startPoint;

        // Calculate angles for rotation
        const angleStart = Math.atan2(startPoint.y - placePosition.z, startPoint.x - placePosition.x);
        const angleCurrent = Math.atan2(currentPoint.y - placePosition.z, currentPoint.x - placePosition.x);
        
        // Calculate rotation delta
        let rotationDelta = (angleCurrent - angleStart) * interactionStateRef.current.rotationSensitivity;
        
        // Apply new rotation
        setRotationY(interactionStateRef.current.baseRotation + (-rotationDelta));
        
        // Update last point
        interactionStateRef.current.lastPoint = currentPoint;
        
        logXREvent('onMove', event);
    };

    return (
        <group>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} />

            {isPresenting && (
                <>
                    {isPlaced ? (
                        <group 
                            position={placePosition.toArray()}
                            ref={modelRef}
                        >
                            <group rotation-y={rotationY}>
                                <Interactive
                                    onSelect={onSelect}
                                    onSelectEnd={onSelectEnd}
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