import { Container, Row, Col, Form, Button } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { loginAdmin } from "../helpers/queries";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Administrador = ({setAdminLogueado}) => {

    const {register, handleSubmit, formState: {errors}} = useForm();

    const navegacion = useNavigate(); 

    const onSubmit = (usuario) =>{
        loginAdmin(usuario).then((respuesta) =>{
            if(respuesta){
                const datosAdmin = {
                    email: respuesta.email,
                    nombreAdmin: respuesta.nombreAdmin,
                }
                sessionStorage.setItem("administrador" , JSON.stringify(datosAdmin));
                Swal.fire({
                    title: "Bienvenido administrador",
                    text: `${datosAdmin.nombreAdmin} iniciaste sesión correctamente`,
                    icon: "success",
                    confirmButtonColor: '#ef0808'
                  });
                  setAdminLogueado(respuesta);
                  navegacion("/inicioadmin");
            }
        })
    }

  return (
    <main className="my-5">
      <Container>
        <Row>
          <Col className="col-md-6 col-sm-12 mb-5">
            <Form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su email"
                  {...register("email", {
                    required: "El email es un campo obligatorio",
                    pattern:{
                        value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                        message: "El email es un formato invalido"
                    }
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.email?.message}
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
              <h1>MiIES <span className="text-secondary">administrador</span></h1>
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

export default Administrador;
