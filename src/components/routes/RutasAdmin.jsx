
import { Route, Routes } from "react-router-dom";
import InicioAdmin from "../InicioAdmin";
import AgregaAlumno from "../panelAdministrador/AgregaAlumno";
import ListaEstudiantesExamenes from "../panelAdministrador/ListaEstudiantesExamenes";

const RutasAdmin = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<InicioAdmin />} />
        <Route exact path="/agregaralumno" element={<AgregaAlumno/>}/>
        <Route exact path="/inscriptosexamen" element={<ListaEstudiantesExamenes/>}/>
      </Routes>
    </>
  );
};

export default RutasAdmin;
