import { createContext,useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [auth, setAuth] = useState(false)
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {props.children}
        </AuthContext.Provider>
    )
}

