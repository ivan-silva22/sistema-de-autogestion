import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { incribirExamen, obtenerMaterias } from "./helpers/queries";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

const InscripcionExamen = ({ alumnoLogueado }) => {
  const [materias, setMaterias] = useState([]);
  const [botonesDeshabilitados, setBotonesDeshabilitados] = useState(() => {
    const botonesGuardados = localStorage.getItem('botonesDeshabilitados');
    return botonesGuardados ? JSON.parse(botonesGuardados) : [];
  });

  useEffect(() => {
    obtenerMaterias(alumnoLogueado).then((respuesta) => {
      setMaterias(respuesta.materias);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('botonesDeshabilitados', JSON.stringify(botonesDeshabilitados));
  }, [botonesDeshabilitados]);

  const handleClick = (materiaId, materia) =>{
    setBotonesDeshabilitados([...botonesDeshabilitados, materiaId]);
    localStorage.setItem("botonesDesabilitado" , JSON.stringify(botonesDeshabilitados));
    onSubmit(materiaId, materia);
  }

  const onSubmit =(materia ) =>{
    incribirExamen(materia, alumnoLogueado).then((respuesta) =>{
      Swal.fire({
        title: "Exito",
        text: `Se inscribio al examen final de ${materia}, suerte🍀`,
        icon: "success",
        confirmButtonColor: '#ef0808'
      });
    })
  }
 
  return (
    <main>
      <Container>
        <section className="text-center my-4">
          <h3>Inscripción a examenes finales</h3>
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
                  <Button type="button" className=" btn btn-inscripcion" disabled={botonesDeshabilitados.includes(materia.id)} onClick={()=> handleClick(materia.id, materia.nombreMateria)}>Inscribirse</Button>
                </td>
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

export default InscripcionExamen;
