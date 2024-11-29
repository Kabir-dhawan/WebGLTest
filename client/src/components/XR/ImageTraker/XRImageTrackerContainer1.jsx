import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR, useXR } from "@react-three/xr";
import XRScene from "../../xr/XRScene";
import { OrbitControls } from "@react-three/drei";

const XRImageTrackerContainer = () => {
  const [showPlaceHolder, setShowPlaceHolder] = useState(false);
  //const { isPresenting } = useXR(); // Get AR session status
  const imageRef = useRef(); // Ref for the image tracker
  const [avatars, setAvatars] = useState([]);
  const { session } = useParams();

  useEffect(() => {
    if (session) {
        avatarService.getAllAvatarsBySession(session)
            .then(data => {
                setAvatars(data.data);
                if (data.data?.length > 0) {
                    setSceneId(data.data[0].user_scene_id);
                }
            })
            .catch(error => console.error('Error fetching avatars:', error));
    }
}, [session]);
  return (
    <>
      <ARButton
        sessionInit={{
          requiredFeatures: ["image-tracking", "hit-test"], // Add image-tracking
          optionalFeatures: ["dom-overlay"], // Add dom-overlay for instructions
          domOverlay: { root: document.body }, // Display instructions on the screen
        }}
      />

      <Canvas>
        <XR>
          {/* Conditionally render OrbitControls only when not in AR mode */}
          {<OrbitControls />}

          {/* Image Tracking with Model */}
          <ImageTracker
            url={"ar_marker.png"}
            ref={imageRef}
            model={ <XRScene avatars={avatars} scale={0.1} />}
          />
        </XR>
      </Canvas>
    </>
  );
};

// Image Tracker Component
const ImageTracker = ({ url, ref, model }) => {
  const { isPresenting } = useXR();

  return (
    isPresenting && (
      <XRImageTracking ref={ref} url={url}>
        {model}
      </XRImageTracking>
    )
  );
};

export default XRImageTrackerContainer;