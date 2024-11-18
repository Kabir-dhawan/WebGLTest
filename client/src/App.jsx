import {React } from 'react';

import './App.css';
import Experience from './components/Experience';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import SceneManager from './components/Scene/SceneManager';
import XrHitModelContainer from './components/XR/XrHitModelContainer';

function App() {


  return (
 
   <BrowserRouter>
   <Routes>
     <Route path="/WebGLTest" element={<Experience />}></Route>
      <Route path="/WebGLTest/scene/:session" element={<SceneManager />}></Route>
      <Route path="/WebGLTest/xrscene/:session" element={<XrHitModelContainer />}></Route>
   </Routes>
 </BrowserRouter>
  );
}

export default App;