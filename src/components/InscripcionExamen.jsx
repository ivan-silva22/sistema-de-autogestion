import { useEffect, useState } from "react";
import { Button, Container, Table, Spinner } from "react-bootstrap";
import { incribirExamen, obtenerMaterias } from "./helpers/queries";
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
      }
    });
  }, [alumnoLogueado]);

  useEffect(() => {
    localStorage.setItem(
      `botonesDeshabilitadosExamen_${alumnoLogueado.legajo}`,
      JSON.stringify(botonesDeshabilitados)
    );
  }, [botonesDeshabilitados, alumnoLogueado.legajo]);

  const handleClick = (materia) => {
    const nombreMateria = materia.nombreMateria;

    if (!botonesDeshabilitados.includes(nombreMateria)) {
      setBotonesDeshabilitados((prev) => [...prev, nombreMateria]);
      localStorage.setItem(
        `botonesDeshabilitadosExamen_${alumnoLogueado.legajo}`,
        JSON.stringify([...botonesDeshabilitados, nombreMateria])
      );
      onSubmit(materia);
    }
  };

  const onSubmit = (materia) => {
    incribirExamen(materia, alumnoLogueado).then((respuesta) => {
      if(respuesta){
        Swal.fire({
          title: "Éxito",
          text: `Te has inscrito al examen final de ${materia.nombreMateria}, ¡suerte! 🍀`,
          icon: "success",
          confirmButtonColor: "#ef0808",
        });
      }
      
    });
  };
  return (
    <main className="my-5">
      <Container>
        <section className="text-center my-4">
          <h3>Inscripción a examenes finales</h3>
          <hr />
        </section>
        {
          mostrarSpinner ? (
            <div className="text-center my-5">
            <Spinner animation="border" variant="dark" />
          </div>
          ) : (
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>Año</th>
                <th>Materia</th>
                <th>Incripción</th>
              </tr>
            </thead>
            <tbody>
              {materias.map((materia, index) => (
                <tr key={index}>
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
                        onClick={() =>
                          handleClick(materia, materia.nombreMateria)
                        }
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
          )
        }
       
        <section className="mt-5 text-center">
          <NavLink type="button" className=" btn btn-volver" to={"/inicio"}>
            Volver
          </NavLink>
        </section>
      </Container>
    </main>
  );
};

export default InscripcionExamen;
