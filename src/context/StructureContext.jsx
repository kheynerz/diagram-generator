import { createContext,useState } from "react";

export const StructureContext = createContext();

export const StructureContextProvider = (props) =>{
    const [structure, setStructure] = useState([])

    return(
        <StructureContext.Provider  value={{structure,setStructure}}>
            {props.children}
        </StructureContext.Provider>
    )
}
