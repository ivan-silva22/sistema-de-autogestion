import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { login } from "./helpers/queries";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = ({ setAlumnoLogueado }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [mostrarSpinner, setMostrarSpinner] = useState(false);

  const navegacion = useNavigate();

  const onSubmit = (alumno) => {
    setMostrarSpinner(true);
    login(alumno).then((respuesta) => {
      if (respuesta && respuesta.status === 200) {
        const datosAlumno = {
          nombres: respuesta.nombres,
          apellido: respuesta.apellido,
          dni: respuesta.dni,
          legajo: respuesta.legajo,
          carrera: respuesta.carrera,
          estadoAcademico: respuesta.estadoAcademico,
          cursando: respuesta.cursando,
        };
        sessionStorage.setItem("alumno", JSON.stringify(datosAlumno));
        Swal.fire({
          title: "Bienvenido",
          text: `${datosAlumno.nombres} ${datosAlumno.apellido} iniciaste sesión correctamente`,
          icon: "success",
          confirmButtonColor: "#ef0808",
        });
        setAlumnoLogueado(respuesta);
        navegacion("/inicio");
      } else {
        Swal.fire({
          title: "Error",
          text: "Legajo o contraseña incorrecto.",
          icon: "error",
          confirmButtonColor: "#ef0808",
        });
      }
    });
  };

  return (
    <main className="my-5">
      <Container>
        {mostrarSpinner ? (
          <div className="text-center">
            <Spinner className="my-5" animation="border" variant="dark" />
          </div>
        ) : (
          <Row>
            <Col className="col-md-6 col-sm-12 mb-5">
              <Form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicLegajo">
                  <Form.Label>N° Legajo:</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingrese su número de legajo"
                    {...register("legajo", {
                      required: "El legajo es un campo obligatorio",
                      minLength: {
                        value: 4,
                        message: "El legajo es un numero de 4 caracteres",
                      },
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.legajo?.message}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="********"
                    {...register("password", {
                      required: "La contraseña es un dato obligatorio",
                      pattern: {
                        value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                        message:
                          "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.",
                      },
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.password?.message}
                  </Form.Text>
                </Form.Group>
                <div>
                  <Button className="btn-login" type="submit">
                    Ingresar
                  </Button>
                </div>
              </Form>
            </Col>
            <Col className="col-md-6 col-sm-12 ">
              <article className="text-center">
                <h1>MiIES</h1>
                <p>Sistema Académico de Autogestión</p>
                <div>
                  <img
                    className="img-logo"
                    src={logo}
                    alt="logo IES La Cocha"
                  />
                </div>
              </article>
            </Col>
          </Row>
        )}
      </Container>
    </main>
  );
};

export default Login;
