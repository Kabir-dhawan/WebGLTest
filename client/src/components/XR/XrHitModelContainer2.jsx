import React,{ useState } from "react";
import { Canvas } from "@react-three/fiber";
import { XR , createXRStore} from "@react-three/xr";
import XrHitModel from "./XrHitModel";
import { OrbitControls } from "@react-three/drei";

const store = createXRStore();

const XrHitModelContainer = () => {
  
  return (
    <>
      {/* <ARButton
        sessionInit={{
          requiredFeatures: ["hit-test"],
        }}
      /> */}
    <button onClick={() => store.enterAR()}>Enter AR</button>
      <Canvas>
        
        <XR>
          <XrHitModel />
        </XR>
      </Canvas>
    </>
  );
 
};

export default XrHitModelContainer2;