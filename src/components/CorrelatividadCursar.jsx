import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { correlatividad } from "./helpers/queries";

const CorrelatividadCursar = ({ alumnoLogueado }) => {
  const [materiasCorrelativasCursar, setMateriasCorrelativasCursar] = useState(
    []
  );

  useEffect(() => {
    correlatividad(alumnoLogueado).then((respuesta) => {
      setMateriasCorrelativasCursar(respuesta);
      console.log(respuesta);
    });
  }, []);

  return (
    <main className="my-5">
      <Container>
        <section className="text-center my-4">
          <h3>Correlatividades para cursar</h3>
          <hr />
        </section>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Materia</th>
              <th>Correlatividad</th>
            </tr>
          </thead>
          <tbody>
            {materiasCorrelativasCursar.map((materia) => (
              <tr key={materia.id}>
                <td>{materia.Año}</td>
                <td>{materia.nombreMateria}</td>
                <td>{materia.correlatividadCursar}</td>
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

export default CorrelatividadCursar;
