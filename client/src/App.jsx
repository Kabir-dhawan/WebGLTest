import {React } from 'react';

import './App.css';
import Experience from './components/Experience';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import SceneManager from './components/Scene/SceneManager';
import XrHitModelContainer from './components/XR/XrHitModelContainer';
import XRImageTrackerContainer from './components/XR/ImageTraker/XRImageTrackerContainer';
// import MindARTracker from './components/XR/ImageTraker/MindARTracker';
function App() {


  return (
 
   <BrowserRouter>
   <Routes>
     <Route path="/WebGLTest" element={<Experience />}></Route>
      <Route path="/WebGLTest/scene/:session" element={<SceneManager />}></Route>
      <Route path="/WebGLTest/xrscene/:session" element={<XrHitModelContainer />}></Route>
      <Route path="/WebGLTest/tracker/:session" element={<XRImageTrackerContainer />}></Route>
      {/* <Route path="/WebGLTest/trackermind/" element={<MindARTracker />}></Route> */}
   </Routes>
 </BrowserRouter>
  );
}

export default App;