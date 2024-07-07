import { Container, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Inicio = () => {
  return (
    <main className="my-5">
      <Container>
        <section className="text-center">
          <h3>ALUMNO: Silva Ivan Jesus Alberto</h3>
        </section>
        <section className="mt-5">
          <ListGroup>
            <ListGroup.Item action>
              <NavLink className="nav-link" to={"/materiasdelplan"}>
                <i className="bi bi-caret-right-square-fill"></i> Materias del plan
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action>
              <NavLink className="nav-link" to={"/estadoacademico"}>
                <i className="bi bi-caret-right-square-fill"></i> Estado académico
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action>
              <NavLink className="nav-link" to={"/cursado"}>
                <i className="bi bi-caret-right-square-fill"></i> Cursando
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action>
              <NavLink className="nav-link" to={"/correlatividadcursar"}>
                <i className="bi bi-caret-right-square-fill"></i> Correlatividad
                para cursar
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action>
              <NavLink className="nav-link" to={"/correlatividadrendir"}>
                <i className="bi bi-caret-right-square-fill"></i> Correlatividad
                para rendir
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action>
              <NavLink className="nav-link" to={"/inscripcionexamen"}>
                <i className="bi bi-caret-right-square-fill"></i> Inscripción a
                examen
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action>
              <NavLink className="nav-link" to={"/inscripcioncursado"}>
                <i className="bi bi-caret-right-square-fill"></i> Inscripción a
                cursado
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action>
              <NavLink className="nav-link" to={"/cambiarcontraseña"}>
                <i className="bi bi-caret-right-square-fill"></i> Cambio de
                contraseña
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action>
              <NavLink className="nav-link" to={"/login"}>
                <i className="bi bi-caret-right-square-fill"></i> Salir
              </NavLink>
            </ListGroup.Item>
          </ListGroup>
        </section>
      </Container>
    </main>
  );
};

export default Inicio;
