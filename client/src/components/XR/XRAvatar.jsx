import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
import {  useThree } from '@react-three/fiber';
//import { useAtom } from "jotai";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SkeletonUtils } from "three-stdlib";
//import { useGrid } from "../hooks/useGrid";
//import { socket, userAtom } from "./SocketManager";

const MOVEMENT_SPEED = 0.032;
const ANIMATION_FILE = ["M_Standing_Idle_001","M_Walk_001","M_Dances_001","hi"];
const ANIMATION_STATE = ["M_Standing_Idle_001","M_Walk_001","M_Dances_001","Armature.001Action" ];
//const BASE_URL = "https://kabir-dhawan.github.io/WebGLTest/animations";
const BASE_URL = "/animations";
export default function XRAvatar({
  id,
  avatarUrl = "https://models.readyplayer.me/64f0265b1db75f90dcfd9e2c.glb",
  animationState = 0,
  ...props
}) {
  const position = useMemo(() => props.position, []);
  const avatar = useRef();
  const [path, setPath] = useState();
  //const { gridToVector3 } = useGrid();

  const group = useRef();
  const { scene } = useGLTF(avatarUrl);
  // Skinned meshes cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  // useGraph creates two flat object collections for nodes and materials
  const { nodes } = useGraph(clone);

  const { animations: idleAnimation } = useGLTF(   `${BASE_URL}/${ANIMATION_FILE[0]}.glb`  );
  const { animations: walkAnimation } = useGLTF(`${BASE_URL}/${ANIMATION_FILE[1]}.glb`);
  const { animations: danceAnimation } = useGLTF(    `${BASE_URL}/${ANIMATION_FILE[2]}.glb`  );
  const { animations: hiAnimation } = useGLTF(   `${BASE_URL}/${ANIMATION_FILE[3]}.glb`  );

  const { actions } = useAnimations(
    [walkAnimation[0], idleAnimation[0], danceAnimation[0], hiAnimation[0]],
    avatar
  );
  //console.log(actions);
  const [animation, setAnimation] = useState(ANIMATION_STATE[animationState]);
  const [isDancing, setIsDancing] = useState(true);

  

  useEffect(() => {
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, []);

  useEffect(() => {
    //console.log(actions);
    if(actions[animation])
    actions[animation].reset().fadeIn(0.32).play();
    return () => actions[animation]?.fadeOut(0.32);
  }, [animation, avatarUrl, animationState]);

  useEffect(() => {
    // Restart animation when avatarUrl or animationState changes
    setAnimation(ANIMATION_STATE[animationState]);
  }, [avatarUrl, animationState]);

  

  return (
    <group
      ref={group}
      {...props}
      position={position}
      dispose={null}
      name={`character-${id}`}
      
    >
      <primitive object={clone} ref={avatar} />
    </group>
  );
}

// useGLTF.preload("/models/Animated Woman.glb");
useGLTF.preload(`${BASE_URL}/${ANIMATION_FILE[0]}.glb`);
useGLTF.preload(`${BASE_URL}/${ANIMATION_FILE[1]}.glb`);
useGLTF.preload(`${BASE_URL}/${ANIMATION_FILE[2]}.glb`);
useGLTF.preload(`${BASE_URL}/${ANIMATION_FILE[3]}.glb`);
