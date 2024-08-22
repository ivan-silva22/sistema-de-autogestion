import { useEffect, useState } from "react";
import { Button, Container, Table, Spinner } from "react-bootstrap";
import { inscribirExamen, obtenerMaterias } from "./helpers/queries";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

const InscripcionExamen = ({ alumnoLogueado, habilitarExamenes }) => {
  const [materias, setMaterias] = useState([]);
  const [botonesDeshabilitados, setBotonesDeshabilitados] = useState(() => {
    const botonesGuardados = localStorage.getItem(
      `botonesDeshabilitadosExamen_${alumnoLogueado.legajo}`
    );
    return botonesGuardados ? JSON.parse(botonesGuardados) : [];
  });
  const [mostrarSpinner, setMostrarSpinner] = useState(true);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const respuesta = await obtenerMaterias(alumnoLogueado);
        if (respuesta) {
          setMaterias(respuesta.materias);
        } else {
          Swal.fire(
            "Ocurrió un error",
            "No se pueden mostrar las materias, intente nuevamente más tarde",
            "error"
          );
        }
      } catch (error) {
        Swal.fire(
          "Error",
          "Hubo un problema al cargar las materias. Intente más tarde.",
          "error"
        );
      } finally {
        setMostrarSpinner(false);
      }
    };

    fetchMaterias();
  }, [alumnoLogueado]);

  useEffect(() => {
    localStorage.setItem(
      `botonesDeshabilitadosExamen_${alumnoLogueado.legajo}`,
      JSON.stringify(botonesDeshabilitados)
    );
  }, [botonesDeshabilitados, alumnoLogueado.legajo]);

  const handleClick = async (materia) => {
    const nombreMateria = materia.nombreMateria;

    if (!botonesDeshabilitados.includes(nombreMateria)) {
      try {
        setBotonesDeshabilitados((prev) => [...prev, nombreMateria]);
        const respuesta = await inscribirExamen(materia, alumnoLogueado);

        if (respuesta) {
          Swal.fire({
            title: "Éxito",
            text: `Te has inscrito al examen final de ${materia.nombreMateria}, ¡suerte! 🍀`,
            icon: "success",
            confirmButtonColor: "#ef0808",
          });
        } else {
          throw new Error("No se pudo completar la inscripción");
        }
      } catch (error) {
        Swal.fire(
          "Error",
          "Hubo un problema al intentar inscribirse. Intente nuevamente.",
          "error"
        );
      }
    }
  };

  return (
    <main className="my-5">
      <Container>
        <section className="text-center my-4">
          <h3>Inscripción a exámenes finales</h3>
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
                    {habilitarExamenes ? (
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

export default InscripcionExamen;