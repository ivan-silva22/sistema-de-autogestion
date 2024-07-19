import { useEffect, useState } from "react";
import { Container, Form, Table } from "react-bootstrap";
import { obtenerExamenes } from "../helpers/queries";
import { NavLink } from "react-router-dom";

const ListaEstudiantesExamenes = () => {
  const [datosExamenes, setDatosExamenes] = useState([]);
  const [filtroCarrera, setFiltroCarrera] = useState("");
  const [filtroMateria, setFiltroMateria] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerExamenes().then((respuesta) => {
      setDatosExamenes(respuesta);
      setCargando(false);
    });
  }, []);

  const handleFiltroChange = (event) => {
    const { name, value } = event.target;
    if (name === "filtroCarrera") {
      setFiltroCarrera(value);
    } else if (name === "filtroMateria") {
      setFiltroMateria(value);
    }
  };

  const alumnosFiltrados = datosExamenes.filter(
    (alumno) =>
      (!filtroCarrera || alumno.carrera === filtroCarrera) &&
      (!filtroMateria || alumno.nombreMateria === filtroMateria)
  );

  return (
    <main className="my-4">
      <Container>
        <section>
          <h3 className="text-center">Lista de alumnos</h3>
          <hr />
        </section>
        <section className="my-3 text-end">
          <NavLink className="btn btn-regresar" to={"/inicioadmin"}>
            Volver
          </NavLink>
        </section>
        <section className="my-4">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicCarrera">
              <Form.Label>Filtrar por Carrera:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="filtroCarrera"
                value={filtroCarrera}
                onChange={handleFiltroChange}
              >
                <option value="">Seleccione una opción</option>
                {[
                  ...new Set(datosExamenes.map((alumno) => alumno.carrera)),
                ].map((carrera) => (
                  <option key={carrera} value={carrera}>
                    {carrera}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMateria">
              <Form.Label>Filtrar por Materia:</Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="filtroMateria"
                value={filtroMateria}
                onChange={handleFiltroChange}
              >
                <option value="">Seleccione una opción</option>
                {[
                  ...new Set(
                    datosExamenes.map((alumno) => alumno.nombreMateria)
                  ),
                ].map((materia) => (
                  <option key={materia} value={materia}>
                    {materia}
                  </option>
                ))}
              </Form.Select>
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
                <th>Materia</th>
                <th>Fecha</th>
                <th>Carrera</th>
              </tr>
            </thead>
            <tbody>
              {alumnosFiltrados.map((dato, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{dato.nombres}</td>
                    <td>{dato.apellido}</td>
                    <td>{dato.dni}</td>
                    <td>{dato.nombreMateria}</td>
                    <td>{dato.fecha}</td>
                    <td>{dato.carrera}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Container>
    </main>
  );
};

export default ListaEstudiantesExamenes;
