import { Button, Container, ListGroup } from "react-bootstrap";

const Inicio = () => {
  return (
    <main className="my-5">
      <Container>
        <section className="text-center">
          <h3>ALUMNO: Silva Ivan Jesus Alberto</h3>
        </section>
        <section className="mt-5">
          <ListGroup>
            <ListGroup.Item action  href="#link1">
            <i class="bi bi-caret-right-square-fill"></i> Materias del plan
            </ListGroup.Item>
            <ListGroup.Item action href="#link2" >
            <i class="bi bi-caret-right-square-fill"></i> Estado académico
            </ListGroup.Item>
            <ListGroup.Item action href="#link3">
            <i class="bi bi-caret-right-square-fill"></i> Notas de parciales
            </ListGroup.Item>
            <ListGroup.Item action href="#link3">
            <i class="bi bi-caret-right-square-fill"></i> Correlatividad para cursar
            </ListGroup.Item>
            <ListGroup.Item action href="#link3">
            <i class="bi bi-caret-right-square-fill"></i> Correlatividad para rendir
            </ListGroup.Item>
            <ListGroup.Item action href="#link3">
            <i class="bi bi-caret-right-square-fill"></i> Inscripción a examen 
            </ListGroup.Item>
            <ListGroup.Item action href="#link3">
            <i class="bi bi-caret-right-square-fill"></i> Inscripción a cursado
            </ListGroup.Item>
            <ListGroup.Item action href="#link3">
            <i class="bi bi-caret-right-square-fill"></i> Cambio de contraseña
            </ListGroup.Item>
            <ListGroup.Item action href="#link3">
            <i class="bi bi-caret-right-square-fill"></i> Salir
            </ListGroup.Item>
          </ListGroup>
        </section>
      </Container>
    </main>
  );
};

export default Inicio;
