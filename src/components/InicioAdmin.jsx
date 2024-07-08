import { Container, ListGroup } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const InicioAdmin = () => {
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
              <NavLink className="nav-link" to={"/inicio/estadoacademico"}>
                <i className="bi bi-caret-right-square-fill"></i> Estado
                académico
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action>
              <NavLink className="nav-link" to={"/inicio/cursado"}>
                <i className="bi bi-caret-right-square-fill"></i> Cursando
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action>
              <NavLink className="nav-link" to={"/inicio/correlatividadcursar"}>
                <i className="bi bi-caret-right-square-fill"></i> Correlatividad
                para cursar
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action>
              <NavLink className="nav-link" to={"/inicio/correlatividadrendir"}>
                <i className="bi bi-caret-right-square-fill"></i> Correlatividad
                para rendir
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action>
              <NavLink className="nav-link" to={"/inicio/inscripcionexamen"}>
                <i className="bi bi-caret-right-square-fill"></i> Inscripción a
                examen
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action>
              <NavLink className="nav-link" to={"/inicio/inscripcioncursado"}>
                <i className="bi bi-caret-right-square-fill"></i> Inscripción a
                cursado
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
