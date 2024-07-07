import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { obtenerMaterias } from "./helpers/queries";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

const MateriasPlan = ({ alumnoLogueado }) => {
  const [materias, setMaterias] = useState([]);

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

  return (
    <main className="my-5">
      <Container>
        <section className="text-center my-4">
          <h3>Materias de {alumnoLogueado.carrera}</h3>
        </section>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Año</th>
              <th>Dic</th>
              <th>Materia</th>
              <th>Acreditación</th>
            </tr>
          </thead>
          <tbody>
            {materias.map((materia) => (
              <tr key={materia.id}>
                <td>{materia.Año}</td>
                <td>{materia.Dic}</td>
                <td>{materia.nombreMateria}</td>
                <td>{materia.Acreditacion}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <section className="mt-5 text-center">
                <NavLink type="button" className=" btn btn-volver" to={"/inicio"} >Volver</NavLink>
          </section>
      </Container>
    </main>
  );
};

export default MateriasPlan;
