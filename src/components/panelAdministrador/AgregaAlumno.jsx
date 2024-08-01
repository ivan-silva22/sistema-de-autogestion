import { Button, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { crearAlumno } from "../helpers/queries";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

const AgregaAlumno = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (alumno) => {
    crearAlumno(alumno).then((respuesta) => {
      if (respuesta) {
        Swal.fire({
          title: "Exito",
          text: `El alumno se agrego correctamente`,
          icon: "success",
          confirmButtonColor: "#ef0808",
        });
        reset();
      }else{
        Swal.fire({
            title: "Error",
            text: `No se puede agregar el alumno, intente nuevamente más tarde`,
            icon: "error",
            confirmButtonColor: "#ef0808",
          });
      }
    });
  };

  return (
    <main className="my-3">
      <Container>
        <section className="text-center">
          <h3>Agregar alumno</h3>
          <hr />
          
        </section>
        <section className="my-3 text-end">
        <NavLink className="btn btn-regresar" to={"/inicioadmin"}>Volver</NavLink>
        </section>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicNombres">
            <Form.Label>Nombre Completo*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre completo"
              {...register("nombres", {
                required: "El campo Nombres es obligatorio",
                minLength: {
                  value: 2,
                  message: "La cantidad minima de caracteres es de 2 digitos",
                },
                maxLength: {
                  value: 300,
                  message: "La cantidad maxima de caracteres es de 300 digitos",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.nombres?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicApellido">
            <Form.Label>Apellido/s*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el apellido"
              {...register("apellido", {
                required: "El campo Apellido es obligatorio",
                minLength: {
                  value: 2,
                  message: "La cantidad minima de caracteres es de 2 digitos",
                },
                maxLength: {
                  value: 300,
                  message: "La cantidad maxima de caracteres es de 300 digitos",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.apellido?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDni">
            <Form.Label>DNI*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el DNI"
              {...register("dni", {
                required: "El campo DNI es obligatorio",
                pattern: {
                  value: /^\d{7,8}$/,
                  message: "El DNI ingresado es un formato invalido",
                },
              })}
            />
            <Form.Text className="text-danger">{errors.dni?.message}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCarrera">
            <Form.Label>Carrera*</Form.Label>
            <Form.Select
              aria-label="Default select example"
              {...register("carrera", {
                required: "El campo Carrera es obligatorio",
              })}
            >
              <option value="">Selecciona una opción</option>
              <option value="Profesorado en Historia">
                Profesorado en Historia
              </option>
              <option value="Profesorado en Matematica">
                Profesorado en Matemática
              </option>
              <option value="Tecnicatura en Gestion Agropecuaria">
                Tecnicatura en Gestión Agropecuaria
              </option>
              <option value="Tecnicatura en Agroindustria de los Alimentos">
                Tecnicatura en Agroindustria de los Alimentos
              </option>
              <option value="Tecnicatura Superior en Desarrollo de Software">
                Tecnicatura en Desarrollo de Software
              </option>
            </Form.Select>
            <Form.Text className="text-danger">
              {errors.carrera?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLegajo">
            <Form.Label>Legajo*</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el Legajo"
              {...register("legajo", {
                required: "El campo Legajo es obligatorio",
                min: {
                  value: 4,
                  message: "La cantidad minima de caracteres es de 4 digitos",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.legajo?.message}
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña*</Form.Label>
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
            <Button className="btn btn-login" type="submit">
              Guardar
            </Button>
          </div>
        </Form>
      </Container>
    </main>
  );
};

export default AgregaAlumno;
