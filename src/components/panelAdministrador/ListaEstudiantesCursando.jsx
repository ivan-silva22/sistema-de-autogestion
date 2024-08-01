import { useEffect, useState } from "react";
import { Container, Form, Table, Modal, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { actualizarEstadoAcademico, obtenerAlumnosCursando } from "../helpers/queries";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const ListaEstudiantesCursando = () => {
  const [alumnosCursando, setAlumnosCursando] = useState([]);
  const [filtroCursado, setFiltroCursado] = useState("");
  const [cargando, setCargando] = useState(true);
  const [show, setShow] = useState(false);
  const [idAlumno, setIdAlumno] = useState("");

  useEffect(() => {
    obtenerAlumnosCursando().then((respuesta) => {
      if (respuesta) {
        setAlumnosCursando(respuesta);
        setCargando(false);
      }
    });
  }, []);

  const alumnosFiltrados = filtroCursado
    ? alumnosCursando.filter((alumno) => alumno.carrera === filtroCursado)
    : alumnosCursando;

  const handleFiltroChange = (event) => {
    setFiltroCursado(event.target.value);
  };

  const unicoAlumnos = Array.from(new Set(alumnosFiltrados.map(a => a.dni)))
  .map(dni => alumnosFiltrados.find(a => a.dni === dni));

  const handleShow = (dni) => {
    setShow(true);
    setIdAlumno(dni)
  }  

  const handleClose = () => setShow(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (EstadoAcademico) =>{
    actualizarEstadoAcademico(EstadoAcademico, idAlumno).then((respuesta) =>{
      if(respuesta){
        Swal.fire({
          title: "Exito!",
          text: "El estado academico del alumno se actualizo correctamente!",
          icon: "success"
        });
        reset()
      }else if(respuesta === false){
        Swal.fire({
          title: "Error!",
          text: "La materia ya existe!",
          icon: "error"
        });
      }else{
        Swal.fire({
          title: "Error!",
          text: "El estado academico del alumno no se actualizo correctamente, intente nuevamente más tarde",
          icon: "error"
        })
      }
    })
  } 


  return (
    <main className="my-4">
      <Container>
        <section>
          <h3 className="text-center">Lista de alumnos inscriptos en las carreras</h3>
          <hr />
        </section>
        <section className="my-3 text-end">
          <NavLink className="btn btn-regresar" to={"/inicioadmin"}>
            Volver
          </NavLink>
        </section>
        <section className="my-4">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Filtrar por Carrera:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={filtroCursado}
                onChange={handleFiltroChange}
              >
                <option value="">Seleccione una opción</option>
                {[
                  ...new Set(alumnosCursando.map((alumno) => alumno.carrera)),
                ].map((carrera) => (
                  <option key={carrera} value={carrera}>
                    {carrera}
                  </option>
                ))}
              </Form.Select>
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
          </Form>
        </section>
        {cargando ? (
          <p>Cargando datos...</p>
        ) : (
          <Table striped bordered hover responsive className="table-scroll">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombres</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Año</th>
                <th>Carrera</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {unicoAlumnos.map((dato, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{dato.nombres}</td>
                  <td>{dato.apellido}</td>
                  <td>{dato.dni}</td>
                  <td>{dato.anio}</td>
                  <td>{dato.carrera}</td>
                  <td>
                  <Button variant="warning" onClick={() =>{handleShow(dato.dni)}}>
                      Actualizar Estado Académico
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Estado Académico</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
              <Form.Label>Nombre Materia</Form.Label>
              <Form.Control
                type="text"
                placeholder="Matemática"
              
                {...register("nombreMateria", {
                  required: "El nombre de la materia es obligatorio",
                  minLength: {
                    value: 2,
                    message: "La cantidad minima de caracteres es de 2 digitos",
                  },
                  maxLength: {
                    value: 200,
                    message: "La cantidad maxima de caracteres es de 200 digitos",
                  },
                })}
              />
              <Form.Text className="text-danger">
              {errors.nombreMateria?.message}
            </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Año</Form.Label>
              <Form.Control
                type="number"
               placeholder="1"
                
                {...register("anio", {
                  required: "El año es obligatorio",
                  min: {
                    value: 1,
                    message: "La cantidad minima es 1"
                  },
                  max: {
                    value: 3
                  }
                })}
              />
              <Form.Text className="text-danger">
              {errors.anio?.message}
            </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                placeholder="Aprobo 9, Folio 30, Tomo 40"
               
                {...register("estado", {
                  required: "El estado es obligatorio",
                  minLength: {
                    value: 2,
                    message: "La cantidad minima de caracteres es de 2 digitos",
                  },
                  maxLength: {
                    value: 500,
                    message: "La cantidad maxima de caracteres es de 500 digitos",
                  },
                })}
              />
               <Form.Text className="text-danger">
              {errors.estado?.message}
            </Form.Text>
            </Form.Group>
            <Button variant="danger" type="submit">
              Guardar Cambios
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default ListaEstudiantesCursando;
