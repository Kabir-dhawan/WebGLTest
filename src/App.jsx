import {React } from 'react';

import './App.css';
import Experience from './components/Experience';
import { BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {


  return (
 
   <BrowserRouter>
   <Routes>
     <Route path="/" element={<Experience />}>
           </Route>
   </Routes>
 </BrowserRouter>
  );
}

export default App;