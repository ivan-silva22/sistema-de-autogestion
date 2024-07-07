import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Cursando = ({ alumnoLogueado = { alumnoLogueado } }) => {
  const [materiasCursando, setMateriasCursando] = useState([]);

  useEffect(() => {
    setMateriasCursando(alumnoLogueado.cursando);
  }, []);

  return (
    <main>
      <Container>
        <section className="text-center my-4">
          <h3>Materias que se encuentra cursando</h3>
        </section>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Año</th>
              <th>Materia</th>
              <th>Comisión</th>
              <th>Horarios</th>
            </tr>
          </thead>
          <tbody>
            {materiasCursando.map((materia) => (
              <tr key={materia.id}>
                <td>{materia.Año}</td>
                <td>{materia.nombreMateria}</td>
                <td>{materia.comision}</td>
                <td>{materia.horarios}</td>
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

export default Cursando;
