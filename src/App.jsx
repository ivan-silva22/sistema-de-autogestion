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
  const administrador = JSON.parse(sessionStorage.getItem("administrador")) || {};
  const habilitarExa =
    JSON.parse(localStorage.getItem("habilitarInscripcion")) || false;
  const habilitarMate =
    JSON.parse(localStorage.getItem("habilitarMaterias")) || false;
  const [alumnoLogueado, setAlumnoLogueado] = useState(alumno);
  const [adminLogueado, setAdminLogueado] = useState(administrador);
  const [habilitarExamenes, setHabilitarExamenes] = useState(habilitarExa);
  const [habilitarMaterias, setHabilitarMaterias] = useState(habilitarMate);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<Login setAlumnoLogueado={setAlumnoLogueado} />}
          />
          <Route exact path="/administrador" element={<Administrador setAdminLogueado={setAdminLogueado} />} />
          <Route
            path="/inicioadmin/*"
            element={
              <RutasProtegidasAdmin>
                <RutasAdmin
                setAdminLogueado={setAdminLogueado}
                  habilitarExamenes={habilitarExamenes}
                  setHabilitarExamenes={setHabilitarExamenes}
                  habilitarMaterias={habilitarMaterias}
                  setHabilitarMaterias={setHabilitarMaterias}
                ></RutasAdmin>
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
                  habilitarExamenes={habilitarExamenes}
                  habilitarMaterias={habilitarMaterias}
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
