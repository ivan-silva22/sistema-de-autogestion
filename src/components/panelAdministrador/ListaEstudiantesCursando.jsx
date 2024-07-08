import { useEffect, useState } from "react";
import { Container, Form, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { obtenerAlumnosCursando } from "../helpers/queries";

const ListaEstudiantesCursando = () => {
  const [alumnosCursando, setAlumnosCursando] = useState([]);
  const [filtroCursado, setFiltroCursado] = useState("");
  const [cargando, setCargando] = useState(true);

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
              </tr>
            </thead>
            <tbody>
              {alumnosFiltrados.map((dato, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{dato.nombres}</td>
                  <td>{dato.apellido}</td>
                  <td>{dato.dni}</td>
                  <td>{dato.Año}</td>
                  <td>{dato.carrera}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </main>
  );
};

export default ListaEstudiantesCursando;
