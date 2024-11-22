import React, { useState, useRef, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { OrbitControls } from "@react-three/drei";

const store = createXRStore();

function TestReticle (){
  const [red, setRed] = useState(false);
  const [rotation, setRotation] = useState([0, 0, 0]); // State to track rotation
  const isDragging = useRef(false);
  const lastPointerPosition = useRef({ x: 0, y: 0 });
 
  
  const selectTest = (e) => {
    console.log("working test point...");
  };

  const handlePointerDown = (e) => {
    //console.log("working handlePointerDown...");
 

    isDragging.current = true;
    lastPointerPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    //console.log("working handlePointerMove...");
    if (!isDragging.current) return;

    const deltaX = e.clientX - lastPointerPosition.current.x;
    const deltaY = e.clientY - lastPointerPosition.current.y;

    setRotation((prevRotation) => [
      //prevRotation[0] - deltaY * 0.01, // Adjust rotation around X-axis
      prevRotation[0] , // Adjust rotation around X-axis
      prevRotation[1] + deltaX * 0.05, // Adjust rotation around Y-axis
      prevRotation[2],
    ]);

    lastPointerPosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    //console.log("working handlePointerUp...");
    isDragging.current = false;
  };

  const objThree = useThree();
  useEffect(()=>{
    //console.log(objThree.events.handlers);
    //objThree.events.handlers.onPointerDown.bind((e)=>{ console.log("bind on pointer down",e);});
  });
  
  return <><mesh
              onClick={() => setRed(!red)}
              position={[0, 1, -1]}
              rotation={rotation} // Apply rotation
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              <boxGeometry />
              <meshBasicMaterial color={red ? "red" : "blue"} />
          </mesh></>;
}

const EventBindingExample = () => {
  const { gl } = useThree(); // Access WebGL context and DOM element

  useEffect(() => {
    const handlePointerDown = (event) => {
      console.log("Canvas clicked at:", event.clientX, event.clientY);
    };

    // Bind the event listener to the canvas
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);

    // Clean up the event listener on unmount
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [gl]); // Dependency array ensures the effect runs only once

  return null; // No need to render anything for this example
};
const XrHitModelContainer = () => {

  
  return (
    <>
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <Canvas>
        <XR store={store}>
          
        <EventBindingExample />
          <TestReticle/>
        </XR>
      </Canvas>
    </>
  );
};

export default XrHitModelContainer;
