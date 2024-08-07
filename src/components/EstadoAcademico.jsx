import { useEffect, useState } from "react";
import { Container, Table, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const EstadoAcademico = ({ alumnoLogueado }) => {
  const [materias, setMaterias] = useState([]);
  const [mostrarSpinner, setMostrarSpinner] = useState(true);

  useEffect(() => {
    setMostrarSpinner(true);
    setMaterias(alumnoLogueado.estadoAcademico);
    setMostrarSpinner(false);
  }, []);

  return (
    <main className="my-5">
      <Container>
        <section className="text-center my-4">
          <h3>
            Estado académico de {alumnoLogueado.nombres}{" "}
            {alumnoLogueado.apellido}{" "}
          </h3>
          <hr />
        </section>
        {mostrarSpinner ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="dark" />
          </div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Año</th>
                <th>Materia</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {materias.map((materia, index) => (
                <tr key={index}>
                  <td>{materia.anio}</td>
                  <td>{materia.nombreMateria}</td>
                  <td>{materia.estado}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

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
