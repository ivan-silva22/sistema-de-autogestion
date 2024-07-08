
import { Route, Routes } from "react-router-dom";
import InicioAdmin from "../InicioAdmin";
import AgregaAlumno from "../panelAdministrador/AgregaAlumno";

const RutasAdmin = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<InicioAdmin />} />
        <Route exact path="/agregaralumno" element={<AgregaAlumno/>}/>
      </Routes>
    </>
  );
};

export default RutasAdmin;
