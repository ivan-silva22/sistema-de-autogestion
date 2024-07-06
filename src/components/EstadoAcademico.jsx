import { Container, Table } from "react-bootstrap";

const EstadoAcademico = () => {
  return (
    <main>
      <Container>
        <section className="text-center my-4">
          <h3>Estado académico de Silva Ivan Jesus Alberto</h3>
        </section>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Año</th>
              <th>Materia</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Ciudadanía y espacio publíco</td>
              <td>Aprobada con 9, Tomo: 1, Folio: 57</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Introducción a la informática</td>
              <td>Aprobada con 10, Tomo: 1, Folio: 47</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Introducción a redes</td>
              <td>Aprobada con 10, Tomo: 1, Folio: 47</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </main>
  );
};

export default EstadoAcademico;
