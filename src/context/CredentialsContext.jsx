import { createContext,useState } from "react";

export const CredentialsContext = createContext();

export const CredentialsContextProvider = (props) =>{
    const [credentials, setCredentials] = useState({
      host: "localhost",
      database: "congresos",
      port: "5432",
      user: "postgres",
      password: "1234",
    });

    return(
        <CredentialsContext.Provider  value={{credentials,setCredentials}}>
            {props.children}
        </CredentialsContext.Provider>
    )
}
