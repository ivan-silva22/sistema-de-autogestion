import { Button, Col, Container, Form, Row } from "react-bootstrap";
import logo from "../assets/logo.png";


const Login = () => {
  return (
    <main className="my-5">
      <Container>
        <Row>
          <Col>
            <Form className="mx-auto">
              <Form.Group className="mb-3" controlId="formBasicLegajo">
                <Form.Label>N° Legajo:</Form.Label>
                <Form.Control type="text" placeholder="Ingrese su número de legajo" />
                <Form.Text className="text-danger">
                  El número de legajo es un campo obligatorio
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control type="password" placeholder="********" />
                <Form.Text className="text-danger">
                  La contraseña es un campo obligatorio
                </Form.Text>
              </Form.Group>
              <div>
                <Button className="btn-login" type="submit">Ingresar</Button>
              </div>
            </Form>
          </Col>
          <Col>
            <article className="text-center">
                <h1>MiIES</h1>
                <p>Sistema Académico de Autogestión</p>
                <div>
                    <img className="img-logo" src={logo} alt="logo IES La Cocha" />
                </div>
            </article>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Login;
