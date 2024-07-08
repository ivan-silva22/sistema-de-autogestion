import { Navigate } from "react-router-dom";

const RutasProtegidasAdmin = ({children}) => {
    const adminLogueado = JSON.parse(sessionStorage.getItem("administrador")) || null;
    if(!adminLogueado){
        return <Navigate to={"/administrador"}></Navigate>
    }
    else{
        return children;
    }
};

export default RutasProtegidasAdmin;