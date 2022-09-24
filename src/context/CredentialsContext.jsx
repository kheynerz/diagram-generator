import { createContext,useState } from "react";

export const CredentialsContext = createContext();

const initialLoginData = {
    direccion: "",
    nombre: "",
    puerto: "",
    usuario: "",
    clave: ""
  };

export const CredentialsContextProvider = (props) =>{
    const [credentials, setCredentials] = useState(initialLoginData)

    return(
        <CredentialsContext.Provider  value={{credentials,setCredentials}}>
            {props.children}
        </CredentialsContext.Provider>
    )
}
