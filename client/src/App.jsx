import {React } from 'react';

import './App.css';
import Experience from './components/Experience';
import AvatarSetup from './components/AvatarSetup';
import { BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {


  return (
 
   <BrowserRouter>
   <Routes>
     <Route path="/WebGLTest" element={<Experience />}>
           </Route>
   </Routes>
 </BrowserRouter>
  );
}

export default App;