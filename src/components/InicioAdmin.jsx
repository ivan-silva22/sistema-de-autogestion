import { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const InicioAdmin = ({
  setAdminLogueado,
  habilitarExamenes,
  setHabilitarExamenes,
  setHabilitarMaterias,
  habilitarMaterias,
}) => {
  const [estadoBotonInscripcion, setEstadoBotonInscripcion] = useState( JSON.parse(localStorage.getItem("habilitarInscripcion")) || false);
  const [estadoBotonInscripcionMaterias, setEstadoBotonInscripcionMaterias] =
    useState(JSON.parse(localStorage.getItem("habilitarMaterias")) || false);
  const navegacion = useNavigate();

  useEffect(() => {
    setEstadoBotonInscripcion(habilitarExamenes);
    setEstadoBotonInscripcionMaterias(habilitarMaterias);
  }, [habilitarExamenes, habilitarMaterias]);
  

  const habilitarInscripcion = () => {
    Swal.fire({
      title: "Desea habilitar las incripciones a los exames?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar!",
    }).then((result) => {
      if (result.isConfirmed) {
        setHabilitarExamenes(true);
        localStorage.setItem(
          "habilitarInscripcion",
          JSON.stringify(true)
        );
        setEstadoBotonInscripcion(true);
        Swal.fire({
          title: "Exito!",
          text: "Las inscripciones se habilitaron.",
          icon: "success",
        });
      }
    });
  };

  const desabilitarInscripcion = () => {
    Swal.fire({
      title: "Desea desabilitar las incripciones a los examenes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar!",
    }).then((result) => {
      if (result.isConfirmed) {
        setHabilitarExamenes(false);
        localStorage.setItem(
          "habilitarInscripcion",
          JSON.stringify(false)
        );
        setEstadoBotonInscripcion(false);
        Swal.fire({
          title: "Exito!",
          text: "Las inscripciones se habilitaron.",
          icon: "success",
        });
      }
    });
  };

  const habilitarMateriasCursando = () => {
    Swal.fire({
      title: "Desea habilitar las incripciones para las materias?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar!",
    }).then((result) => {
      if (result.isConfirmed) {
        setHabilitarMaterias(true);
        localStorage.setItem(
          "habilitarMaterias",
          JSON.stringify(true)
        );
        setEstadoBotonInscripcionMaterias(true);
        Swal.fire({
          title: "Exito!",
          text: "Las inscripciones se habilitaron.",
          icon: "success",
        });
      }
    });
  };

  const desabilitarMateriasCursando = () =>{
    Swal.fire({
      title: "Desea desabilitar las incripciones para las materias?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar!",
    }).then((result) => {
      if (result.isConfirmed) {
        setHabilitarMaterias(false);
        localStorage.setItem(
          "habilitarMaterias",
          JSON.stringify(false)
        );
        setEstadoBotonInscripcionMaterias(false);
        Swal.fire({
          title: "Exito!",
          text: "Las inscripciones se desabilitaron.",
          icon: "success",
        });
      }
    });
  }

  const cerrarSesion = () =>{
    sessionStorage.removeItem("administrador");
    setAdminLogueado({});
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Cerrando Sesión",
      showConfirmButton: false,
      timer: 1500
    });
    navegacion('/administrador');
  }

  return (
    <main className="my-5">
      <Container>
        <section className="text-center">
          <h3>Panel Administrador</h3>
          <hr />
        </section>
        <section className="mt-5">
          <ListGroup>
            <ListGroup.Item action>
              <NavLink className="nav-link" to={"/inicioadmin/agregaralumno"}>
                <i className="bi bi-caret-right-square-fill"></i> Agregar alumno
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action>
              <NavLink
                className="nav-link"
                to={"/inicioadmin/inscriptosexamen"}
              >
                <i className="bi bi-caret-right-square-fill"></i> Alumnos
                inscriptos a examenes
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action>
              <NavLink
                className="nav-link"
                to={"/inicioadmin/listaalumnoscursando"}
              >
                <i className="bi bi-caret-right-square-fill"></i> Alumnos
                cursando
              </NavLink>
            </ListGroup.Item>
            {!estadoBotonInscripcion ? (
              <ListGroup.Item action onClick={() => habilitarInscripcion()}>
                <div className="nav-link">
                  <i className="bi bi-caret-right-square-fill"></i> Habilitar
                  inscripción examenes
                </div>
              </ListGroup.Item>
            ) : (
              <ListGroup.Item action onClick={() => desabilitarInscripcion()}>
                <div className="nav-link">
                  <i className="bi bi-caret-right-square-fill"></i> Desabilitar
                  inscripción examenes
                </div>
              </ListGroup.Item>
            )}
            {!estadoBotonInscripcionMaterias ? (
              <ListGroup.Item
                action
                onClick={() => habilitarMateriasCursando()}
              >
                <NavLink className="nav-link">
                  <i className="bi bi-caret-right-square-fill"></i> Habilitar
                  inscripción de materias
                </NavLink>
              </ListGroup.Item>
            ) : (
              <ListGroup.Item
                action
                onClick={() => desabilitarMateriasCursando()}
              >
                <NavLink className="nav-link">
                  <i className="bi bi-caret-right-square-fill"></i> Desabilitar
                  inscripción de materias
                </NavLink>
              </ListGroup.Item>
            )}

            <ListGroup.Item action>
              <NavLink className="nav-link" to={"/inicioadmin/cambiarcontraseña"}>
                <i className="bi bi-caret-right-square-fill"></i> Cambio de
                contraseña
              </NavLink>
            </ListGroup.Item>
            <ListGroup.Item action  onClick={cerrarSesion}>
              <i className="bi bi-caret-right-square-fill"></i> Salir
            </ListGroup.Item>
          </ListGroup>
        </section>
      </Container>
    </main>
  );
};

export default InicioAdmin;
