import { Button, Container, Form } from "react-bootstrap";

const CambiarPassword = () => {
  return (
    <main className="my-5">
      <Container>
        <section>
          <h4>Cambiar Contraseña</h4>
        </section>
        <section>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña Actual:</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
              />
              <Form.Text className="text-danger">
                La contraseña es un campo obligatorio
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordNuevo">
              <Form.Label>Nueva contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
              />
              <Form.Text className="text-danger">
                La contraseña nueva es un campo obligatorio
              </Form.Text>
            </Form.Group>
            <Button type="button">Guardar</Button>
          </Form>
        </section>
      </Container>
    </main>
  );
};

export default CambiarPassword;
