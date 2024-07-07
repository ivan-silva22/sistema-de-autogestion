import { Button, Container, Table } from "react-bootstrap";
import { inscribirMateria, obtenerMaterias } from "./helpers/queries";
import { useEffect, useState } from "react";

const InscripcionCursado = ({ alumnoLogueado }) => {
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

  const handleClick = ( materia, alumnoLogueado) =>{
    inscribirMateria(materia, alumnoLogueado).then((respuesta) =>{
      console.log(respuesta)
    })
  }


  return (
    <main>
      <Container>
        <section className="text-center my-4">
          <h3>Inscripción a cursado</h3>
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
                  <Button type="button" onClick={()=> handleClick(materia, alumnoLogueado)}>Inscribirse</Button>
                </td>
              </tr>
            ))}

           
          </tbody>
        </Table>
        <section className="mt-5 text-center">
          <Button type="button">Volver</Button>
        </section>
      </Container>
    </main>
  );
};

export default InscripcionCursado;
