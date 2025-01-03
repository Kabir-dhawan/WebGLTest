import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useGraph } from "@react-three/fiber";
//import { useAtom } from "jotai";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SkeletonUtils } from "three-stdlib";
//import { useGrid } from "../hooks/useGrid";
//import { socket, userAtom } from "./SocketManager";

const MOVEMENT_SPEED = 0.032;

export default function Avatar1({
  hairColor = "green",
  topColor = "pink",
  bottomColor = "brown",
  id,
  avatarUrl = "https://models.readyplayer.me/64f0265b1db75f90dcfd9e2c.glb",
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

  const { animations: walkAnimation } = useGLTF("https://kabir-dhawan.github.io/WebGLTest/animations/M_Walk_001.glb");
  const { animations: danceAnimation } = useGLTF(
    "https://kabir-dhawan.github.io/WebGLTest/animations/M_Dances_001.glb"
  );
  const { animations: idleAnimation } = useGLTF(
    "https://kabir-dhawan.github.io/WebGLTest/animations/M_Standing_Idle_001.glb"
  );

  const { actions } = useAnimations(
    [walkAnimation[0], idleAnimation[0], danceAnimation[0]],
    avatar
  );
  const [animation, setAnimation] = useState("M_Standing_Idle_001");
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
    actions[animation].reset().fadeIn(0.32).play();
    return () => actions[animation]?.fadeOut(0.32);
  }, [animation]);



  useFrame((state) => {
    const hips = avatar.current.getObjectByName("Hips");
    hips.position.set(0, hips.position.y, 0);
    if (path?.length && group.current.position.distanceTo(path[0]) > 0.1) {
      const direction = group.current.position
        .clone()
        .sub(path[0])
        .normalize()
        .multiplyScalar(MOVEMENT_SPEED);
      group.current.position.sub(direction);
      group.current.lookAt(path[0]);
      setAnimation("M_Walk_001");
      setIsDancing(false);
    } else if (path?.length) {
      path.shift();
    } else {
      if (isDancing) {
        setAnimation("M_Dances_001");
      } else {
        setAnimation("M_Standing_Idle_001");
      }
    }
    // if (id === user) {
    //   state.camera.position.x = group.current.position.x + 8;
    //   state.camera.position.y = group.current.position.y + 8;
    //   state.camera.position.z = group.current.position.z + 8;
    //   state.camera.lookAt(group.current.position);
    // }
  });

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
useGLTF.preload("https://kabir-dhawan.github.io/WebGLTest/animations/M_Walk_001.glb");
useGLTF.preload("https://kabir-dhawan.github.io/WebGLTest/animations/M_Standing_Idle_001.glb");
useGLTF.preload("https://kabir-dhawan.github.io/WebGLTest/animations/M_Dances_001.glb");
