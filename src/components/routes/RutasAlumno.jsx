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
import InicioAdmin from "../InicioAdmin";

const RutasAlumno = ({ alumnoLogueado, setAlumnoLogueado, habilitarExamenes, habilitarMaterias }) => {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Inicio
              alumnoLogueado={alumnoLogueado}
              setAlumnoLogueado={setAlumnoLogueado}
            />
          }
        />
        <Route exact path="/materiasdelplan" element={<MateriasPlan alumnoLogueado={alumnoLogueado} />} />
        <Route exact path="/estadoacademico" element={<EstadoAcademico alumnoLogueado={alumnoLogueado} />} />
        <Route exact path="/cursado" element={<Cursando alumnoLogueado={alumnoLogueado} />} />
        <Route
          exact
          path="/correlatividadcursar"
          element={<CorrelatividadCursar alumnoLogueado={alumnoLogueado} />}
        />
        <Route
          exact
          path="/correlatividadrendir"
          element={<CorrelatividadRendir alumnoLogueado={alumnoLogueado} />}
        />
        <Route
          exact
          path="/inscripcionexamen"
          element={<InscripcionExamen alumnoLogueado={alumnoLogueado} habilitarExamenes={habilitarExamenes} />}
        />
        <Route
          exact
          path="/inscripcioncursado"
          element={<InscripcionCursado alumnoLogueado={alumnoLogueado} habilitarMaterias={habilitarMaterias} />}
        />
        <Route exact path="/cambiarpassword" element={<CambiarPassword alumnoLogueado={alumnoLogueado} />} />
        <Route exact path="/inicio-admin" element={<InicioAdmin/>}/>
      </Routes>
    </>
  );
};

export default RutasAlumno;
