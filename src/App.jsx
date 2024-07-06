import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Login from './components/Login'
import Inicio from './components/Inicio';
import MateriasPlan from './components/MateriasPlan';
import EstadoAcademico from './components/EstadoAcademico';
import Cursando from './components/Cursando';
import CorrelatividadCursar from './components/CorrelatividadCursar';
import InscripcionExamen from './components/InscripcionExamen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CorrelatividadRendir from './components/CorrelatividadRendir';
import CambiarPassword from './components/CambiarPassword';
import InscripcionCursado from './components/InscripcionCursado';

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Inicio/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/materiasdelplan' element={<MateriasPlan/>} />
          <Route path='/estadoacademico' element={<EstadoAcademico/>} />
          <Route path='/cursado' element={<Cursando/>} />
          <Route path='/correlatividadcursar' element={<CorrelatividadCursar/>} />
          <Route path='/correlatividadrendir' element={<CorrelatividadRendir/>} />
          <Route path='/inscripcionexamen' element={<InscripcionExamen/>} />
          <Route path='/inscripcioncursado' element={<InscripcionCursado/>} />
          <Route path='/cambiarcontraseña' element={<CambiarPassword/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
