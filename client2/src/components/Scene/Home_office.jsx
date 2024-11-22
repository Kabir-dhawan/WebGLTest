import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Home_office(props) {
  const { nodes, materials } = useGLTF('/models/home_office.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.156}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.polySurface26_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface27_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface28_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface29_Furniture_0.geometry} material={materials.Furniture} position={[-0.029, 3.941, 4.746]} />
          <mesh geometry={nodes.polySurface30_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface35_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface36_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface37_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface38_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface39_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface40_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface41_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface42_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface43_Furniture_0.geometry} material={materials.Furniture} position={[0, 0, 0.775]} />
          <mesh geometry={nodes.polySurface44_Furniture_0.geometry} material={materials.Furniture} position={[0, 0, 0.775]} />
          <mesh geometry={nodes.polySurface45_Furniture_0.geometry} material={materials.Furniture} position={[0, 0, 0.775]} />
          <mesh geometry={nodes.polySurface46_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface47_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface48_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface53_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface54_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface55_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface56_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface57_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface58_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface59_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface60_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface61_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface62_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface63_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface64_Furniture_0.geometry} material={materials.Furniture} position={[-0.029, 2.356, 4.746]} />
          <mesh geometry={nodes.polySurface66_Furniture_0.geometry} material={materials.Furniture} position={[7.045, 0, 0]} />
          <mesh geometry={nodes.polySurface67_Furniture_0.geometry} material={materials.Furniture} position={[-7.1, 0, 0]} />
          <mesh geometry={nodes.polySurface68_Furniture_0.geometry} material={materials.Furniture} position={[-7.1, -3.958, 0]} />
          <mesh geometry={nodes.polySurface69_Furniture_0.geometry} material={materials.Furniture} position={[-0.185, -3.958, 0]} />
          <mesh geometry={nodes.polySurface70_Furniture_0.geometry} material={materials.Furniture} position={[9.023, -3.278, -0.945]} rotation={[-Math.PI, 0, -Math.PI]} />
          <mesh geometry={nodes.polySurface71_Furniture_0.geometry} material={materials.Furniture} position={[15.222, -3.278, -0.945]} rotation={[-Math.PI, 0, -Math.PI]} />
          <mesh geometry={nodes.polySurface72_Furniture_0.geometry} material={materials.Furniture} position={[3.061, -3.278, -0.945]} rotation={[-Math.PI, 0, -Math.PI]} />
          <mesh geometry={nodes.polySurface33_Furniture_0.geometry} material={materials.Furniture} />
          <mesh geometry={nodes.polySurface65_Furniture_0.geometry} material={materials.Furniture} position={[3.649, -1.837, -0.847]} />
          <mesh geometry={nodes.polySurface21_Macetas_2_0.geometry} material={materials.Macetas_2} />
          <mesh geometry={nodes.polySurface18_Macetas_2_0.geometry} material={materials.Macetas_2} />
          <mesh geometry={nodes.polySurface19_Macetas_1_0.geometry} material={materials.Macetas_1} />
          <mesh geometry={nodes.polySurface73_Macetas_1_0.geometry} material={materials.Macetas_1} position={[-0.178, 3.853, 3.161]} scale={0.622} />
          <mesh geometry={nodes.polySurface20_Macetas_1_0.geometry} material={materials.Macetas_1} />
          <mesh geometry={nodes.polySurface23_Transparent_2_0.geometry} material={materials.Transparent_2} />
          <mesh geometry={nodes.polySurface22_Maceta_3_0.geometry} material={materials.Maceta_3} />
          <mesh geometry={nodes.polySurface24_Transparent_0.geometry} material={materials.Transparent} position={[0, 0.008, 0]} />
          <mesh geometry={nodes.polySurface74_Transparent_0.geometry} material={materials.Transparent} position={[8.032, 2.205, 3.587]} scale={0.531} />
          <mesh geometry={nodes.Asset_1_Macetas_2_0.geometry} material={materials.Macetas_2} />
          <mesh geometry={nodes.Desk_lamp1_Assets_0.geometry} material={materials.Assets} />
          <mesh geometry={nodes.Pencils_Assets_0.geometry} material={materials.Assets} />
          <mesh geometry={nodes.Trash_Assets_0.geometry} material={materials.Assets} />
          <mesh geometry={nodes.Photos_Assets_0.geometry} material={materials.Assets} />
          <mesh geometry={nodes.Books_Assets_0.geometry} material={materials.Assets} />
          <mesh geometry={nodes.chair_1_low_Assets_0.geometry} material={materials.Assets} />
          <mesh geometry={nodes.chair_2_low_Assets_0.geometry} material={materials.Assets} />
          <mesh geometry={nodes.chair_3_low_Assets_0.geometry} material={materials.Assets} />
          <mesh geometry={nodes.Lamp1_Assets_0.geometry} material={materials.Assets} />
          <mesh geometry={nodes.Walls1_Walls_0.geometry} material={materials.Walls} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/home_office.glb')
