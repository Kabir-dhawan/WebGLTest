import React, { Suspense, useRef, useEffect,useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function Avatar({ avatarUrl = 'https://models.readyplayer.me/670e069cb8d37556eaee135d.glb',
    ...props
 }) {
    const position = useMemo(() => props.position, []);
    const avatar = useRef();
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(avatarUrl);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // Play the idle animation by default, if available
    if (actions && actions['idle']) {
      actions['idle'].play();
    } else {
      console.warn('Idle animation not found in the model.');
    }
  }, [actions]);

  return (
    <group ref={group} dispose={null} position={position}>
      {/* Conditionally render avatar parts to handle potential missing nodes */}
      {nodes?.Hips && <primitive object={nodes.Hips} />}
      {nodes?.Wolf3D_Body && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
      )}
      {nodes?.Wolf3D_Hair && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
      )}
      {nodes?.Wolf3D_Outfit_Bottom && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
      )}
      {nodes?.Wolf3D_Outfit_Footwear && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
      )}
      {nodes?.Wolf3D_Outfit_Top && (
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
      )}
      {nodes?.EyeLeft && (
        <skinnedMesh
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
      )}
      {nodes?.EyeRight && (
        <skinnedMesh
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
      )}
    </group>
  );
}