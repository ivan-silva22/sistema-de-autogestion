import { useEffect, useState } from "react";
import { Container, Form, Table } from "react-bootstrap";
import { obtenerExamenes } from "../helpers/queries";

const ListaEstudiantesExamenes = () => {
  const [datosExamenes, setDatosExamenes] = useState([]);
  const [filtroCarrera, setFiltroCarrera] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerExamenes().then((respuesta) => {
      setDatosExamenes(respuesta);
      setCargando(false);
    });
  }, []);

  const handleFiltroChange = (event) => {
    setFiltroCarrera(event.target.value);
  };

  const alumnosFiltrados = filtroCarrera
    ? datosExamenes.filter(alumno => alumno.carrera === filtroCarrera)
    : datosExamenes;

  return (
    <main className="my-4">
      <Container>
        <section>
          <h3 className="text-center">Lista de alumnos</h3>
          <hr />
        </section>
        <section className="my-4">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Filtrar por Carrera:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={filtroCarrera}
                onChange={handleFiltroChange}
              >
                <option value="">Seleccione una opción</option>
              {[...new Set(datosExamenes.map(alumno => alumno.carrera))].map(carrera => (
                <option key={carrera} value={carrera}>{carrera}</option>
              ))}
              </Form.Select>
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
          </Form>
        </section>
        {cargando  ? (
          <p>Cargando datos...</p>
        ) : (
          <Table striped bordered hover responsive className="table-scroll">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombres</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Materia</th>
                <th>Fecha</th>
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
                  <td>{dato.nombreMateria}</td>
                  <td>{dato.fecha}</td>
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

export default ListaEstudiantesExamenes;
