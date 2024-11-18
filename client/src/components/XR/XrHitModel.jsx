import {React, Suspense,  useState, useEffect,useRef } from 'react';
import { OrbitControls, Billboard, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import {Interactive, useHitTest, useXR } from "@react-three/xr";
import { useParams } from 'react-router-dom';
import avatarService from '../../services/avatarService';

import XRScene from "./XRScene";

const XrHitModel = () => {
    const [avatars, setAvatars] = useState([]);
    const [sceneId, setSceneId] = useState(1);
    //const [searchParams] = useSearchParams();
    const { session } = useParams();

   
  const reticleRef = useRef();
  const [models, setModels] = useState([]);

  const { isPresenting } = useXR();

  useEffect(() => {
    console.log("session : ", session);
    if (session) {
        avatarService.getAllAvatarsBySession(session)
            .then(data => {
                setAvatars(data.data); // Assuming data is an array of avatars
                console.log("avatars", data.data);
                if(data.data){
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
    if(!reticleRef|| !reticleRef.current ) return;
    hitMatrix.decompose(
      reticleRef.current.position,
      reticleRef.current.quaternion,
      reticleRef.current.scale
    );

    reticleRef.current.rotation.set(-Math.PI / 2, 0, 0);
  });

  const placeModel = (e) => {
    let position = e.intersection.object.position.clone();
    const id = Date.now();
    setModels([{ position, id }]);
  };

  return (
    <>
      <OrbitControls />
      <ambientLight />
      {isPresenting &&
        models.map(({ position, id }) => {
            console.log(id);
          return <>
                        <XRScene key={id} scale={0.1} position={position} avatars={avatars}/>
                        
                        </>;
        })}
      {isPresenting && (
        <Interactive onSelect={placeModel}>
          <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
            <ringGeometry args={[0.1, 0.25, 32]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
        </Interactive>
      )}

      {!isPresenting &&<> <XRScene  avatars={avatars} scale={1}/></>
                        }
    </>
  );
};

export default XrHitModel;