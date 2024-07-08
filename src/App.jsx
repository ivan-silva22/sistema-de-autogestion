import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import RutasProtegidas from "./components/routes/RutasProtegidas";
import RutasAlumno from "./components/routes/RutasAlumno";
import Administrador from "./components/panelAdministrador/Administrador";
import RutasProtegidasAdmin from "./components/routes/RutasProtegidasAdmin";
import RutasAdmin from "./components/routes/RutasAdmin";


function App() {
  const alumno = JSON.parse(sessionStorage.getItem("alumno")) || {};
  const [alumnoLogueado, setAlumnoLogueado] = useState(alumno);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<Login setAlumnoLogueado={setAlumnoLogueado} />}
          />
          <Route exact path="/administrador" element={<Administrador />} />
          <Route
            path="/inicioadmin/*"
            element={
              <RutasProtegidasAdmin>
                <RutasAdmin></RutasAdmin>
              </RutasProtegidasAdmin>
            }
          />
          <Route
            path="/inicio/*"
            element={
              <RutasProtegidas>
                <RutasAlumno
                  alumnoLogueado={alumnoLogueado}
                  setAlumnoLogueado={setAlumnoLogueado}
                ></RutasAlumno>
              </RutasProtegidas>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
