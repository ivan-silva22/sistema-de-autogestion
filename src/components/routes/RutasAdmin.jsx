
import { Route, Routes } from "react-router-dom";
import InicioAdmin from "../InicioAdmin";
import AgregaAlumno from "../panelAdministrador/AgregaAlumno";
import ListaEstudiantesExamenes from "../panelAdministrador/ListaEstudiantesExamenes";
import ListaEstudiantesCursando from "../panelAdministrador/ListaEstudiantesCursando";

const RutasAdmin = ({habilitarExamenes, setHabilitarExamenes}) => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<InicioAdmin habilitarExamenes={habilitarExamenes} setHabilitarExamenes={setHabilitarExamenes} />} />
        <Route exact path="/agregaralumno" element={<AgregaAlumno/>}/>
        <Route exact path="/inscriptosexamen" element={<ListaEstudiantesExamenes/>}/>
        <Route exact path="/listaalumnoscursando" element={<ListaEstudiantesCursando/>}/>
      </Routes>
    </>
  );
};

export default RutasAdmin;