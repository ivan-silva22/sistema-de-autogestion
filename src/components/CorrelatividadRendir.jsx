import { useEffect, useState } from "react";
import { Container, Table, Spinner } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { correlatividad } from "./helpers/queries";

const CorrelatividadRendir = ({ alumnoLogueado }) => {
  const [materiasCorrelativasRendir, setMateriasCorrelativasRendir] = useState(
    []
  );

  const [mostrarSpinner, setMostrarSpinner] = useState(true);

  useEffect(() => {
    correlatividad(alumnoLogueado).then((respuesta) => {
      setMostrarSpinner(true);
      setMateriasCorrelativasRendir(respuesta);
      setMostrarSpinner(false);
    });
  }, []);

  return (
    <main className="my-5">
      <Container>
        <section className="text-center my-4">
          <h3>Correlatividad para rendir</h3>
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
                <th>#</th>
                <th>Materia</th>
                <th>Correlatividad</th>
              </tr>
            </thead>
            <tbody>
              {materiasCorrelativasRendir.map((materia, index) => (
                <tr key={index}>
                  <td>{materia.anio}</td>
                  <td>{materia.nombreMateria}</td>
                  <td>{materia.correlatividadRendir}</td>
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

export default CorrelatividadRendir;
