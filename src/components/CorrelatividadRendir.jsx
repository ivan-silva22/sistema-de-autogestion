import { Button, Container, Table } from "react-bootstrap";

const CorrelatividadRendir = () => {
    return (
        <main>
        <Container>
          <section className="text-center my-4">
            <h3>Correlatividades para rendir</h3>
          </section>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Materia</th>
                <th>Correlatividad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Ciudadanía y espacio publíco</td>
                <td>-</td>
             
              </tr>
              <tr>
                <td>2</td>
                <td>Introducción a la informática</td>
                <td>-</td>
             
              </tr>
              <tr>
                <td>3</td>
                <td>Introducción a redes</td>
                <td>-</td>
                
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

export default CorrelatividadRendir;