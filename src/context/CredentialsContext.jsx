import { createContext,useState } from "react";

export const CredentialsContext = createContext();

export const CredentialsContextProvider = (props) =>{
    const [credentials, setCredentials] = useState({
      host: "localhost",
      database: "postgres",
      port: "5432",
      user: "postgres",
      password: "12345",
    });

    return(
        <CredentialsContext.Provider  value={{credentials,setCredentials}}>
            {props.children}
        </CredentialsContext.Provider>
    )
}
