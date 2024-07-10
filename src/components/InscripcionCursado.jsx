import { Button, Container, Table } from "react-bootstrap";
import { inscribirMateria, obtenerMaterias } from "./helpers/queries";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

const InscripcionCursado = ({ alumnoLogueado, habilitarMaterias }) => {
  const [materias, setMaterias] = useState([]);
  const [botonesDeshabilitados, setBotonesDeshabilitados] = useState(() => {
    const botonesGuardados = localStorage.getItem(
      "botonesDeshabilitadosCursado"
    );
    return botonesGuardados ? JSON.parse(botonesGuardados) : [];
  });

  useEffect(() => {
    const botonesGuardados = localStorage.getItem(
      "botonesDeshabilitadosCursado"
    );
    if (botonesGuardados) {
      setBotonesDeshabilitados(JSON.parse(botonesGuardados));
    }
  }, []);

  useEffect(() => {
    obtenerMaterias(alumnoLogueado).then((respuesta) => {
      if (respuesta) {
        setMaterias(respuesta.materias);
      } else {
        Swal.fire(
          "Ocurrio un error",
          "No se puede mostrar las materias, intente nuevamente más tarde",
          "error"
        );
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "botonesDeshabilitadosCursado",
      JSON.stringify(botonesDeshabilitados)
    );
  }, [botonesDeshabilitados]);

  const handleClick = (materia, alumnoLogueado) => {
    inscribirMateria(materia, alumnoLogueado).then((respuesta) => {
      if (respuesta) {
        Swal.fire({
          title: "Exito",
          text: `Se inscribio a la materia: ${materia.nombreMateria}`,
          icon: "success",
          confirmButtonColor: "#ef0808",
        });
        setBotonesDeshabilitados([...botonesDeshabilitados, materia.id]);
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Año</th>
              <th>Materia</th>
              <th>Incripción</th>
            </tr>
          </thead>
          <tbody>
            {materias.map((materia) => (
              <tr key={materia.id}>
                <td>{materia.Año}</td>
                <td>{materia.nombreMateria}</td>
                <td>
                  {habilitarMaterias ? (
                    <Button
                      type="button"
                      className="btn btn-inscripcion"
                      disabled={botonesDeshabilitados.includes(materia.id)}
                      onClick={() => handleClick(materia, alumnoLogueado)}
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
        <section className="mt-5 text-center">
          <NavLink type="button" className=" btn btn-volver" to={"/inicio"}>
            Volver
          </NavLink>
        </section>
      </Container>
    </main>
  );
};

export default InscripcionCursado;
