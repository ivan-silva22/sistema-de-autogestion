import { Navigate } from "react-router-dom";

const RutasProtegidas = ({children}) => {
    const alumnoLogueado = JSON.parse(sessionStorage.getItem("alumno")) || null;
  
    if(!alumnoLogueado){
        return <Navigate to={"/login"}></Navigate>
    }
    else{
        return children;
    }
};

export default RutasProtegidas;