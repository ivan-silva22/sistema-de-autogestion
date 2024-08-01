import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { obtenerMateriasCursando } from "./helpers/queries";

const Cursando = ({ alumnoLogueado }) => {
  const [materiasCursando, setMateriasCursando] = useState([]);

  useEffect(() => {
    obtenerMateriasCursando(alumnoLogueado).then((respuesta) =>{
      setMateriasCursando(respuesta)
    })
  }, []);

  
  return (
    <main className="my-5">
      <Container>
        <section className="text-center my-4">
          <h3>Materias que se encuentra cursando</h3>
          <hr />
        </section>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Año</th>
              <th>Materia</th>
              <th>Dic</th>
            </tr>
          </thead>
          <tbody>
            {materiasCursando.map((materia, index) => (
              <tr key={index}>
                <td>{materia.anio}</td>
                <td>{materia.nombreMateria}</td>
                <td>{materia.dic}</td>
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
