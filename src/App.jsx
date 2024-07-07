import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Inicio from "./components/Inicio";
import MateriasPlan from "./components/MateriasPlan";
import EstadoAcademico from "./components/EstadoAcademico";
import Cursando from "./components/Cursando";
import CorrelatividadCursar from "./components/CorrelatividadCursar";
import InscripcionExamen from "./components/InscripcionExamen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CorrelatividadRendir from "./components/CorrelatividadRendir";
import CambiarPassword from "./components/CambiarPassword";
import InscripcionCursado from "./components/InscripcionCursado";
import { useState } from "react";
import RutasProtegidas from "./components/routes/RutasProtegidas";
import RutasAlumno from "./components/routes/RutasAlumno";

function App() {
  const alumno = JSON.parse(sessionStorage.getItem("alumno")) || {};
  const [alumnoLogueado, setAlumnoLogueado] = useState(alumno);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/login"
            element={<Login setAlumnoLogueado={setAlumnoLogueado} />}
          />
          <Route
            path="/inicio/*"
            element={
              <RutasProtegidas>
                <RutasAlumno></RutasAlumno>
              </RutasProtegidas>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
