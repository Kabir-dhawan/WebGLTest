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
    const [models, setModels] = useState([{ position:[0,1,-2], id : 0, rotationY: 0 }]);
    const { isPresenting } = useXR();

    const rotationIntervalRef = useRef(null);

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
        const id = Date.now();
        setModels([{ position, id, rotationY: 0 }]);
    };

    const startRotation = (e, id) => {
      console.log("work start rotation",e);
        stopRotation(); // Clear any existing interval
        rotationIntervalRef.current = setInterval(() => {
            setModels(prevModels =>
                prevModels.map(model =>
                    model.id === id
                        ? { ...model, rotationY: model.rotationY + Math.PI / 36 } // Increment by 5 degrees
                        : model
                )
            );
        }, 100); // Adjust speed here
    };

    const stopRotation = () => {
      console.log("stop rotation");
        if (rotationIntervalRef.current) {
            clearInterval(rotationIntervalRef.current);
            rotationIntervalRef.current = null;
        }
    };

    
const startRotation2=(e)=>{console.log("start rotation", e);};
    return (
        <group onClick={startRotation2}>
            <OrbitControls />
            <ambientLight />
            {isPresenting &&
                models?.map(({ position, id, rotationY }) => (
                    <Interactive
                        key={id}
                        
                        onSelectStart={startRotation2} // Start rotation on select
                        onSelectEnd={stopRotation} // Stop rotation on release
                    >
                      <mesh scale={0.1}
                            position={position}
                            rotation={[0, rotationY, 0]}>
                              <ringGeometry args={[0.1, 0.25, 32]} />
                              <meshStandardMaterial color={"white"} />
                      <XRScene
                             // Apply Y-axis rotation
                            avatars={avatars}
                        />
                      </mesh>
                        
                    </Interactive>
                ))}
            {/* {isPresenting && (
                <Interactive onSelect={placeModel}>
                    <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
                        <ringGeometry args={[0.1, 0.25, 32]} />
                        <meshStandardMaterial color={"white"} />
                    </mesh>
                </Interactive>
            )} */}
            {!isPresenting && <XRScene avatars={avatars} scale={1} />}
        </group>
    );
};

export default XrHitModel;
