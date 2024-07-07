const URLAlumno = import.meta.env.VITE_API_ALUMNO;
const URLCarrera = import.meta.env.VITE_API_CARRERA;
const URLExamen = import.meta.env.VITE_API_EXAMEN;

export const login = async (alumno) => {
  try {
    const respuesta = await fetch(URLAlumno);
    const listaUsuarios = await respuesta.json();
    const buscarAlumno = listaUsuarios.find(
      (itemAlumno) => itemAlumno.legajo === alumno.legajo
    );
    if (buscarAlumno) {
      if (buscarAlumno.password === alumno.password) {
        return buscarAlumno;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const obtenerMaterias = async (alumno) => {
  try {
    const respuesta = await fetch(URLAlumno);
    const listaAlumnos = await respuesta.json();
    const buscarAlumno = listaAlumnos.find(
      (itemAlumno) => itemAlumno.legajo === alumno.legajo
    );
    if (buscarAlumno) {
      const respuesta = await fetch(URLCarrera);
      const listaCarreras = await respuesta.json();
      const buscarCarrera = listaCarreras.find(
        (carrera) => carrera.nombreCarrera === buscarAlumno.carrera
      );
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
