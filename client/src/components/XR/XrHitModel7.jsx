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
    const [scale, setScale] = useState(1);

    const interactionStateRef = useRef({
        prevX: null,
        rotationSensitivity: 4,
        prevTouchDistance: null,
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

        roatateModel(intersection);

        const intersections = event?.intersections;
        if (!intersections) return;
        scaleModel(intersections);
    };

    const onSelectEnd = () => {
        interactionStateRef.current.prevX = null;
        //console.log("onSelectEnd ",modelRef.current)
        //console.log("onSelectEnd ",modelRef.current.rotation);
    };

    const roatateModel=(intersection)=>{
        const currentX = intersection.point.x;

        //console.log("starting ",modelRef.current.rotation);
        if (interactionStateRef.current.prevX === null) {
            interactionStateRef.current.prevX = currentX;
            return;
        }

        const deltaX = currentX - interactionStateRef.current.prevX;
        if(Math.abs(deltaX) < 0.4)
        {
            //console.log(`old x : ${currentX} new x : ${interactionStateRef.current.prevX}`);
            setRotationY((current) => {
                let newR = current + deltaX * interactionStateRef.current.rotationSensitivity;
                //console.log(`old rotation ${current} new rotation : ${newR}`);
                return newR;
            });
        }
        interactionStateRef.current.prevX = currentX;
        //console.log("end ",modelRef.current.rotation);
    };

    const scaleModel = (intersections)=>{
        if(intersections.length < 2) return;
        console.log("scale up " ,intersections);

        const [touch1, touch2] = intersections;
        const currentDistance = Math.sqrt(
            Math.pow(touch1.point.x - touch2.point.x, 2) +
            Math.pow(touch1.point.y - touch2.point.y, 2)
        );

        if (interactionStateRef.current.prevTouchDistance === null) {
            interactionStateRef.current.prevTouchDistance = currentDistance;
            return;
        }

        const deltaDistance = currentDistance - interactionStateRef.current.prevTouchDistance;
        const zoomSensitivity = 0.005; // Adjust sensitivity as needed
        setScale((prevScale) => Math.max(0.5, prevScale + deltaDistance * zoomSensitivity));

        interactionStateRef.current.prevTouchDistance = currentDistance;
    };

    const onSqueezeEnd = (event)=>{console.log(event);};
    const onSqueezeStart = (event)=>{console.log(event);};
    const onSqueezeMissed = (event)=>{console.log(event);};
    const onSqueeze = (event)=>{console.log(event);};
    return (
        <group>
            <ambientLight intensity={1} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} />

            {isPresenting ? (
                <group position={modelPosition.toArray()} ref={modelRef} rotation-y={rotationY} scale={[scale, scale, scale]}>
                    
                        <Interactive
                            onMove={onMove}
                            onSelectEnd={onSelectEnd}
                            onSqueezeStart = {onSqueezeStart}
                            onSqueezeEnd = {onSqueezeEnd}
                            onSqueezeMissed = {onSqueezeMissed}
                            onSqueeze = {onSqueeze}
                        >
                            <mesh>
                                <XRScene avatars={avatars} scale={0.1} />
                            </mesh>
                        </Interactive>
                    
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