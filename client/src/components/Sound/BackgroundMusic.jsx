import React, { useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function BackgroundMusic() {
    const { camera } = useThree(); // Get the camera from the Three Fiber context
    const audioListener = useRef();
    const backgroundSound = useRef();

    useEffect(() => {
        // Create an AudioListener and add it to the camera
        audioListener.current = new THREE.AudioListener();
        camera.add(audioListener.current);

        // Create a global audio source and set its buffer
        backgroundSound.current = new THREE.Audio(audioListener.current);
        const audioLoader = new THREE.AudioLoader();
        
        // Load a sound and set it as the audio object's buffer
        audioLoader.load('/sounds/game bg music.mp3', (buffer) => {
            backgroundSound.current.setBuffer(buffer);
            backgroundSound.current.setLoop(true); // Loop the background music
            backgroundSound.current.setVolume(0.5); // Set the volume level
            backgroundSound.current.play();
        });

        // Clean up when the component is unmounted
        return () => {
            backgroundSound.current.stop();
            camera.remove(audioListener.current);
        };
    }, [camera]);

    return null; // No visual component needed
}