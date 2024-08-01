import { useEffect, useState } from "react";
import { Container, Form, Table, Button } from "react-bootstrap";
import { eliminarDatosExamenes, obtenerExamenes } from "../helpers/queries";
import { NavLink } from "react-router-dom";
import * as XLSX from "xlsx";
import Swal from "sweetalert2";

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

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(alumnosFiltrados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Estudiantes");
    XLSX.writeFile(workbook, "ListaEstudiantes.xlsx");
  };

  const eliminarDatos = () =>{
    Swal.fire({
      title: "Estas seguro desea borrar todos los datos?",
      text: "No se puede revertir este proceso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarDatosExamenes().then((respuesta) => {
          if(respuesta){
            Swal.fire({
              title: "Eliminado!",
              text: "Los datos fueron eliminados correctamente.",
              icon: "success"
            });
          }
        })
        
      }
    });
  }


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
        <section className="my-3 text-end">
          <Button className="btn btn-descargar-excel" onClick={handleDownloadExcel} disabled={cargando}>
            Descargar Excel
          </Button>
          <Button className="btn btn-eliminar mx-2" onClick={eliminarDatos}>
            Eliminar todos los datos
          </Button>
        </section>
        {cargando ? (
          <p>Cargando datos...</p>
        ) : (
          <Table striped bordered hover responsive className="table-scroll">
            <thead>
              <tr>
                <th>#</th>
                <th>Apellido</th>
                <th>Nombres</th>
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
                    <td>{dato.apellido}</td>
                    <td>{dato.nombres}</td>
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
