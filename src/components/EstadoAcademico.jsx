import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const EstadoAcademico = ({ alumnoLogueado }) => {
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    setMaterias(alumnoLogueado.estadoAcademico);
  }, []);

  return (
    <main>
      <Container>
        <section className="text-center my-4">
          <h3>
            Estado académico de {alumnoLogueado.nombres}{" "}
            {alumnoLogueado.apellido}{" "}
          </h3>
        </section>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Año</th>
              <th>Materia</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {materias.map((materia) => (
              <tr key={materia.id}>
                <td>{materia.Año}</td>
                <td>{materia.nombreMateria}</td>
                <td>{materia.estado}</td>
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

export default EstadoAcademico;
