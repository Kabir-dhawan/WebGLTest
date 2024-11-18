import React,{ useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import XrHitModel from "./XrHitModel";
import { OrbitControls } from "@react-three/drei";

const XrHitModelContainer = () => {
  const [showPlaceHolder, setShowPlaceHolder] = useState(false);
  return (
    <>
      <ARButton
        sessionInit={{
          requiredFeatures: ["hit-test"],
        }}
      />
    {/* <button onClick={() => store.enterAR()}></button> */}
      <Canvas>
        <OrbitControls/>
        <XR>
          <XrHitModel />
        </XR>
      </Canvas>
    </>
  );
};

export default XrHitModelContainer;
