import { Button, Container, Table } from "react-bootstrap";

const Cursando = () => {
    return (
        <main>
        <Container>
          <section className="text-center my-4">
            <h3>Materias que se encuentra cursando</h3>
          </section>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Año</th>
                <th>Materia</th>
                <th>Comisión</th>
                <th>Horarios</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Ciudadanía y espacio publíco</td>
                <td>46</td>
                <td>18:20 - 19:45</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Introducción a la informática</td>
                <td>46</td>
                <td>19:45 - 20:30</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Introducción a redes</td>
                <td>46</td>
                <td>20:40 - 22:00</td>
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

export default Cursando;