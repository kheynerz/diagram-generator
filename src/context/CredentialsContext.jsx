import { createContext,useState } from "react";

export const CredentialsContext = createContext();

export const CredentialsContextProvider = (props) =>{
    const [credentials, setCredentials] = useState({});

    return(
        <CredentialsContext.Provider  value={{credentials,setCredentials}}>
            {props.children}
        </CredentialsContext.Provider>
    )
}
