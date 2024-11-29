import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ARButton, XR, useXR, Interactive } from "@react-three/xr";
import XRScene from "../../xr/XRScene";
import { OrbitControls } from "@react-three/drei";
import { useParams } from "react-router-dom";
import avatarService from "../../../services/avatarService";
// Image Tracker Component with proper tracking setup
const ImageTracker = ({ url, model }) => {

  const [isTracking, setIsTracking] = useState(false);
  const trackerRef = useRef();

  useEffect(() => {
   

    const setupImageTracking = async () => {
      try {
        const imageElement = new Image();
        imageElement.src = url;
        
        await new Promise((resolve) => {
          imageElement.onload = resolve;
        });

        const imageTrackingOptions = {
          image: imageElement,
          estimatedRealWorldWidth: 0.2 // Adjust based on your marker size in meters
        };

        if (trackerRef.current) {
          await trackerRef.current.addImage('marker-1', imageTrackingOptions);
          setIsTracking(true);
        }
      } catch (error) {
        console.error('Error setting up image tracking:', error);
        setIsTracking(false);
      }
    };

    setupImageTracking();

    return () => {
      if (trackerRef.current) {
        trackerRef.current.removeImage('marker-1');
      }
    };
  }, [ url]);

  return  (
    <group ref={trackerRef}>
      {isTracking && (
        <Interactive onSelect={() => console.log('Model selected')}>
          {model}
        </Interactive>
      )}
    </group>
  );
};

// Main Container Component
const XRImageTrackerContainer = () => {
  const [showPlaceHolder, setShowPlaceHolder] = useState(false);
  const [avatars, setAvatars] = useState([]);
  const [sceneId, setSceneId] = useState(null);
  const { session } = useParams();
 
  useEffect(() => {
    if (session) {
      const fetchAvatars = async () => {
        try {
          const response = await avatarService.getAllAvatarsBySession(session);
          setAvatars(response.data);
          if (response.data?.length > 0) {
            setSceneId(response.data[0].user_scene_id);
          }
        } catch (error) {
          console.error('Error fetching avatars:', error);
        }
      };

      fetchAvatars();
    }
  }, [session]);

  return (
    <div className="w-full h-full relative">
      <img src="/images/ar_marker.png" />
      <ARButton
        sessionInit={{
          requiredFeatures: ["image-tracking", "hit-test"],
          optionalFeatures: ["dom-overlay"],
          domOverlay: { root: document.body },
        }}
      />

      <Canvas>
        <XR>
          {<OrbitControls />}
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          <ImageTracker
            url="/images/ar_marker.png"
            model={
              <XRScene 
                avatars={avatars}
                scale={0.1}
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
              />
            }
          />
        </XR>
      </Canvas>

      { (
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
        
        </div>
      )}
    </div>
  );
};

export default XRImageTrackerContainer;