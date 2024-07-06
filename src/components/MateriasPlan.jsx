import { Container, Table } from "react-bootstrap";

const MateriasPlan = () => {
  return (
    <main className="my-5">
      <Container>
        <section className="text-center my-4">
            <h3>Materias de Tecnicatura Superior en Desarrollo de Software</h3>
        </section>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Año</th>
              <th>Dic</th>
              <th>Materia</th>
              <th>Acreditación</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Anual</td>
              <td>Ciudadanía y espacio publíco</td>
              <td>Promoción Directa</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Anual</td>
              <td>Introducción a la informática</td>
              <td>Examen Final</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Anual</td>
              <td>Introducción a redes</td>
              <td>Examen Final</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </main>
  );
};

export default MateriasPlan;
