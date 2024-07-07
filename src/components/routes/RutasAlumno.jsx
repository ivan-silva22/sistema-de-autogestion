import { Routes, Route } from "react-router-dom";
import Inicio from "../Inicio";
import MateriasPlan from "../MateriasPlan";
import EstadoAcademico from "../EstadoAcademico";
import Cursando from "../Cursando";
import CorrelatividadCursar from "../CorrelatividadCursar";
import CorrelatividadRendir from "../CorrelatividadRendir";
import InscripcionExamen from "../InscripcionExamen";
import InscripcionCursado from "../InscripcionCursado";
import CambiarPassword from "../CambiarPassword";

const RutasAlumno = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Inicio />} />
        <Route exact path="/materiasdelplan" element={<MateriasPlan />} />
        <Route exact path="/estadoacademico" element={<EstadoAcademico />} />
        <Route exact path="/cursado" element={<Cursando />} />
        <Route
          exact
          path="/correlatividadcursar"
          element={<CorrelatividadCursar />}
        />
        <Route
          exact
          path="/correlatividadrendir"
          element={<CorrelatividadRendir />}
        />
        <Route
          exact
          path="/inscripcionexamen"
          element={<InscripcionExamen />}
        />
        <Route
          exact
          path="/inscripcioncursado"
          element={<InscripcionCursado />}
        />
        <Route exact path="/cambiarcontraseña" element={<CambiarPassword />} />
      </Routes>
    </>
  );
};

export default RutasAlumno;
