const URLAlumno = import.meta.env.VITE_API_ALUMNO;
const URLCarrera = import.meta.env.VITE_API_CARRERA;
const URLExamen = import.meta.env.VITE_API_EXAMEN;
const URLAdmin = import.meta.env.VITE_API_ADMIN;

export const login = async (alumno) => {
  try {
    const respuesta = await fetch(URLAlumno + "/" + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(alumno),
    });
    const listaUsuarios = await respuesta.json();
    return {
      status: respuesta.status,
      nombres: listaUsuarios.nombres,
      apellido: listaUsuarios.apellido,
      dni: listaUsuarios.dni,
      legajo: listaUsuarios.legajo,
      carrera: listaUsuarios.carrera,
      estadoAcademico: listaUsuarios.estadoAcademico,
      cursando: listaUsuarios.cursando,
    };
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const obtenerMaterias = async (alumno) => {
  try {
    const respuesta = await fetch(URLAlumno + "/" + "alumnos");
    const listaAlumnos = await respuesta.json();
    const buscarAlumno = listaAlumnos.find(
      (itemAlumno) => itemAlumno.legajo === alumno.legajo
    );
    if (buscarAlumno) {
      const respuesta = await fetch(URLCarrera + "/" + "carreras");
      const listaCarreras = await respuesta.json();
      const buscarCarrera = listaCarreras.find(
        (carrera) =>
          carrera.nombreCarrera.toLowerCase() ===
          buscarAlumno.carrera.toLowerCase()
      );
      console.log(buscarCarrera);
      if (buscarCarrera) {
        return buscarCarrera;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const obtenerFecha = () => {
  const dia = new Date().getDate();
  const mes = new Date().getMonth() + 1;
  const anio = new Date().getFullYear();
  return `${dia}/${mes}/${anio}`;
};

export const incribirExamen = async (materia, alumno) => {
  let datosExamen = {
    nombreMateria: materia.nombreMateria,
    fecha: obtenerFecha(),
    alumnosInscriptos: [
      {
        nombres: alumno.nombres,
        apellido: alumno.apellido,
        dni: alumno.dni,
        carrera: alumno.carrera,
        legajo: alumno.legajo,
      },
    ],
  };
  try {
    const respuesta = await fetch(URLExamen + "/" + "finales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosExamen),
    });

    return respuesta;
  } catch (error) {
    console.log(error);
  }
};

export const inscribirMateria = async (materia, alumno) => {
  try {
    let nuevaMateria = {
      anio: materia.anio,
      dic: materia.dic,
      nombreMateria: materia.nombreMateria,
    };
    const respuesta = await fetch(URLAlumno + "/" + "alumnos");
    const listaAlumnos = await respuesta.json();
    const buscarAlumno = listaAlumnos.find(
      (itemAlumno) => itemAlumno.legajo === alumno.legajo
    );
    console.log(buscarAlumno);
    if (buscarAlumno) {
      buscarAlumno.cursando.push(nuevaMateria);
      const respuesta = await fetch(
        URLAlumno + "/" + "materia" + "/" + buscarAlumno._id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(buscarAlumno),
        }
      );
      console.log(respuesta);
      return respuesta;
    }
  } catch (error) {
    console.log(error);
  }
};

export const obtenerMateriasCursando = async (alumno) => {
  try {
    const respuesta = await fetch(URLAlumno + "/" + "alumnos");
    const listaAlumnos = await respuesta.json();
    const buscarAlumno = listaAlumnos.find(
      (itemAlumno) => itemAlumno.legajo === alumno.legajo
    );
    if (buscarAlumno) {
      return buscarAlumno.cursando;
    }
  } catch (error) {
    console.log(error);
  }
};

export const correlatividad = async (alumno) => {
  try {
    const respuesta = await fetch(URLAlumno + "/" + "alumnos");
    const listaAlumnos = await respuesta.json();
    const buscarAlumno = listaAlumnos.find(
      (itemAlumno) => itemAlumno.legajo === alumno.legajo
    );
    if (buscarAlumno) {
      const respuesta = await fetch(URLCarrera + "/" + "carreras");
      const listaCarreras = await respuesta.json();
      const buscarCarrera = listaCarreras.find(
        (itemCarrera) => itemCarrera.nombreCarrera === buscarAlumno.carrera
      );
      if (buscarCarrera) {
        return buscarCarrera.materias;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginAdmin = async (usuario) => {
  try {
    const respuesta = await fetch(URLAdmin + "/" + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
    const datos = await respuesta.json();
    return {
      status: respuesta.status,
      nombreAdmin: datos.nombreAdmin,
      email: datos.email,
    };
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const crearAlumno = async (alumno) => {
  let datosAlumno = {
    nombres: alumno.nombres,
    apellido: alumno.apellido,
    dni: alumno.dni,
    carrera: alumno.carrera,
    legajo: alumno.legajo,
    password: alumno.password,
    estadoAcademico: [],
    cursando: [],
  };
  try {
    const respuesta = await fetch(URLAlumno + "/" + "alumnos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosAlumno),
    });
    return respuesta;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const obtenerExamenes = async () => {
  try {
    const respuesta = await fetch(URLExamen + "/" + "finales");
    const listaExamenes = await respuesta.json();
    let datosExamen = listaExamenes.flatMap((examen) =>
      examen.alumnosInscriptos.map((alumno) => ({
        ...alumno,
        nombreMateria: examen.nombreMateria,
        fecha: examen.fecha,
      }))
    );
    return datosExamen;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const obtenerAlumnosCursando = async () => {
  try {
    const respuesta = await fetch(URLAlumno + "/" + "alumnos");
    const listaAlumnos = await respuesta.json();
    const datos = listaAlumnos.flatMap((dato) =>
      dato.cursando.map((item) => ({
        ...item,
        nombres: dato.nombres,
        apellido: dato.apellido,
        dni: dato.dni,
        Año: item.Año,
        carrera: dato.carrera,
      }))
    );
    return datos;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const cambiarPassword = async (dato) => {
  try {
    const respuesta = await fetch(URLAdmin + "/" + "admin");
    const listaAdmins = await respuesta.json();
    const buscarAdmin = listaAdmins.find(
      (item) => item.password === dato.passwordActual
    );
    if (buscarAdmin) {
      buscarAdmin.password = dato.passwordNuevo;
      const respuesta = await fetch(
        `${URLAdmin} / "admin" /${buscarAdmin.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(buscarAdmin),
        }
      );
      return respuesta;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const cambiarPasswordAlumno = async (dato, legajo) => {
  try {
    const respuesta = await fetch(URLAlumno + "/" + "alumnos");
    const listaAlumnos = await respuesta.json();
    const buscarAlumno = listaAlumnos.find((item) => item.legajo === legajo);
    if (buscarAlumno) {
      buscarAlumno.password = dato.passwordNuevo;
      const respuesta = await fetch(
        URLAlumno + "/" + "alumnos" + "/" + buscarAlumno._id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(buscarAlumno),
        }
      );
      return respuesta;
    } else {
      return null;
    }
  } catch (error) {}
};

export const actualizarEstadoAcademico = async (estadoAcademico, dni) => {
  try {
    const actualizarEstado = {
      nombreMateria: estadoAcademico.nombreMateria,
      anio: estadoAcademico.anio,
      estado: estadoAcademico.estado,
    };
    const respuesta = await fetch(URLAlumno + "/" + "alumnos");
    const listaAlumnos = await respuesta.json();
    const buscarAlumno = listaAlumnos.find(
      (itemAlumno) => itemAlumno.dni === dni
    );
    if (buscarAlumno) {
      buscarAlumno.estadoAcademico.push(actualizarEstado);
      const respuesta = await fetch(
        URLAlumno + "/" + "estado" + "/" + buscarAlumno._id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(buscarAlumno),
        }
      );
      return respuesta;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
