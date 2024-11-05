import {React } from 'react';

import './App.css';
import Experience from './components/Experience';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Scene1 from './components/Scene/Scene1';


function App() {


  return (
 
   <BrowserRouter>
   <Routes>
     <Route path="/WebGLTest" element={<Experience />}>
           </Route>
        <Route path="/WebGLTest/scene/:session" element={<Scene1 />}>
      </Route>
   </Routes>
 </BrowserRouter>
  );
}

export default App;