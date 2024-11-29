import React, { useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ARButton, XR } from "@react-three/xr";
import { OrbitControls } from "@react-three/drei";
import { MindARViewer } from "mind-ar-react";
import XRScene from "../../xr/XRScene";

const MindARTracker = () => {
  const arRef = useRef();

  const handleModelPlacement = (anchorData) => {
    console.log("Image anchor data:", anchorData);
    // Handle showing the 3D model when the image target is recognized
    // Use anchorData to position the model
  };

  return (
    <>
      <MindARViewer
        ref={arRef}
        imageTargetSrc="/images/ar_marker.png"
        onAnchorFound={(anchorData) => handleModelPlacement(anchorData)}
        onAnchorLost={() => console.log("Anchor lost")}
      >
        <Canvas>
          <XR>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {/* Show model */}
            <XRScene />
            <OrbitControls />
          </XR>
        </Canvas>
      </MindARViewer>
    </>
  );
};

export default MindARTracker;
