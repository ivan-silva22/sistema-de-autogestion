import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { cambiarPassword } from "../helpers/queries";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CambiarContraseña = () => {

    const {register, handleSubmit, formState: {errors}, reset} = useForm(); 

    const navegacion = useNavigate();

    const onSubmit  = (datos) =>{
        cambiarPassword(datos).then((respuesta) =>{
            if(respuesta){
                Swal.fire({
                    title: "Exito!",
                    text: "La contraseña se modifico correctamente!",
                    icon: "success"
                  });
                  reset();
                  navegacion("/inicioadmin");
            }else if(respuesta === null){
                Swal.fire({
                    title: "Error!",
                    text: "Contraseña actual incorrecta!",
                    icon: "error"
                  });
            }else{
                Swal.fire({
                    title: "Error!",
                    text: "No se puede cambiar la contraseña, intente nuevamente más tarde!",
                    icon: "error"
                  });
            }
        })
    }

    return (
        <main className="my-5">
      <Container>
        <section className="text-center"> 
          <h3>Cambiar Contraseña</h3>
          <hr />
        </section>
        <section>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña Actual:</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                {...register("passwordActual",{
                    required: "La contraseña es un dato obligatorio",
                    pattern:{
                      value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                      message: "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula."
                    }
                  })}
              />
              <Form.Text className="text-danger">
              {errors.password?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordNuevo">
              <Form.Label>Nueva contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                {...register("passwordNuevo",{
                    required: "La contraseña es un dato obligatorio",
                    pattern:{
                      value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                      message: "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula."
                    }
                  })}
              />
              <Form.Text className="text-danger">
              {errors.password?.message}
              </Form.Text>
            </Form.Group>
            <Button type="submit" className="btn btn-login" >Guardar</Button>
          </Form>
        </section>
      </Container>
    </main>
    );
};

export default CambiarContraseña;