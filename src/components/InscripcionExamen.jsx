import { Button, Container, Table } from "react-bootstrap";

const InscripcionExamen = () => {
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
            <tr>
              <td>1</td>
              <td>Ciudadanía y espacio publíco</td>
              <td>
                <Button type="button">Inscribirse</Button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Introducción a la informática</td>
              <td>
                <Button type="button">Inscribirse</Button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Introducción a redes</td>
              <td>
                <Button type="button">Inscribirse</Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <section className="mt-5 text-center">
          <Button type="button">Volver</Button>
        </section>
      </Container>
    </main>
  );
};

export default InscripcionExamen;
