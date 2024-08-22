import { Button, Container, Table, Spinner } from "react-bootstrap";
import { inscribirMateria, obtenerMaterias } from "./helpers/queries";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

const InscripcionCursado = ({ alumnoLogueado, habilitarMaterias }) => {
  const [materias, setMaterias] = useState([]);
  const [botonesDeshabilitados, setBotonesDeshabilitados] = useState(() => {
    const botonesGuardados = localStorage.getItem(
      `botonesDeshabilitadosCursado_${alumnoLogueado.legajo}`
    );
    return botonesGuardados ? JSON.parse(botonesGuardados) : [];
  });
  const [mostrarSpinner, setMostrarSpinner] = useState(true);

  useEffect(() => {
    obtenerMaterias(alumnoLogueado).then((respuesta) => {
      if (respuesta) {
        setMostrarSpinner(true);
        setMaterias(respuesta.materias);
        setMostrarSpinner(false);
      } else {
        Swal.fire(
          "Ocurrió un error",
          "No se pueden mostrar las materias, intente nuevamente más tarde",
          "error"
        );
        setMostrarSpinner(false);
      }
    });
  }, [alumnoLogueado]);

  useEffect(() => {
    localStorage.setItem(
      `botonesDeshabilitadosCursado_${alumnoLogueado.legajo}`,
      JSON.stringify(botonesDeshabilitados)
    );
  }, [botonesDeshabilitados, alumnoLogueado.legajo]);

  const handleClick = (materia) => {
    inscribirMateria(materia, alumnoLogueado).then((respuesta) => {
      if (respuesta) {
        Swal.fire({
          title: "Éxito",
          text: `Te inscribiste a la materia: ${materia.nombreMateria}`,
          icon: "success",
          confirmButtonColor: "#ef0808",
        });
        setBotonesDeshabilitados((prev) => [...prev, materia.nombreMateria]);
      } else {
        Swal.fire(
          "Error",
          "Hubo un problema al intentar inscribirse, intenta nuevamente.",
          "error"
        );
      }
    });
  };

  return (
    <main className="my-5">
      <Container>
        <section className="text-center my-4">
          <h3>Inscripción a cursado</h3>
          <hr />
        </section>
        {mostrarSpinner ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="dark" />
          </div>
        ) : (
          <Table responsive striped bordered hover>
            <thead className="text-center">
              <tr>
                <th>Año</th>
                <th>Materia</th>
                <th>Inscripción</th>
              </tr>
            </thead>
            <tbody>
              {materias.map((materia, index) => (
                <tr key={index} className="text-center">
                  <td>{materia.anio}</td>
                  <td>{materia.nombreMateria}</td>
                  <td>
                    {habilitarMaterias ? (
                      <Button
                        type="button"
                        className="btn btn-inscripcion"
                        disabled={botonesDeshabilitados.includes(
                          materia.nombreMateria
                        )}
                        onClick={() => handleClick(materia)}
                      >
                        Inscribirse
                      </Button>
                    ) : (
                      <p>Inscripciones deshabilitadas</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        <section className="mt-5 text-center">
          <NavLink type="button" className="btn btn-volver" to={"/inicio"}>
            Volver
          </NavLink>
        </section>
      </Container>
    </main>
  );
};

export default InscripcionCursado;