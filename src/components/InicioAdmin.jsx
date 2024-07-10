import { Container, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const InicioAdmin = ({habilitarExamenes, setHabilitarExamenes}) => {

  const handleClick = () =>{
    console.log("habilitar examenes")
    setHabilitarExamenes(!habilitarExamenes);
    localStorage.setItem("habilitarInscripcion", JSON.stringify(!habilitarExamenes));
  }


  return (
    <main className="my-5">
      <Container>
        <section className="text-center">
          <h3>Panel Administrador</h3>
          <hr />
        </section>
        <section className="mt-5">
          <ListGroup>
            <ListGroup.Item action>
              <NavLink className="nav-link" to={"/inicioadmin/agregaralumno"}>
                <i className="bi bi-caret-right-square-fill"></i> Agregar alumno
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action>
              <NavLink
                className="nav-link"
                to={"/inicioadmin/inscriptosexamen"}
              >
                <i className="bi bi-caret-right-square-fill"></i> Alumnos
                inscriptos a examenes
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action>
              <NavLink
                className="nav-link"
                to={"/inicioadmin/listaalumnoscursando"}
              >
                <i className="bi bi-caret-right-square-fill"></i> Alumnos
                cursando
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action onClick={()=> handleClick()}>
              <div className="nav-link">
                <i className="bi bi-caret-right-square-fill"></i> Habilitar
                inscripción examenes
              </div>
            </ListGroup.Item>
            <ListGroup.Item action>
              <NavLink className="nav-link" to={"/inicio/correlatividadrendir"}>
                <i className="bi bi-caret-right-square-fill"></i> Habilitar
                inscripción de materias
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action>
              <NavLink className="nav-link" to={"/inicio/cambiarcontraseña"}>
                <i className="bi bi-caret-right-square-fill"></i> Cambio de
                contraseña
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action>
              <i className="bi bi-caret-right-square-fill"></i> Salir
            </ListGroup.Item>
          </ListGroup>
        </section>
      </Container>
    </main>
  );
};

export default InicioAdmin;
