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
            {materiasCorrelativasCursar.map((materia, index) => (
              console.log(materia)
              // <tr key={index}>
              //   <td>{materia.anio}</td>
              //   <td>{materia.nombreMateria}</td>
              //   <td>{materia.correlatividadCursar}</td>
              // </tr>
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
