import { useEffect } from "react";
import { createContext,useState} from "react";

export const DiagramContext = createContext();

export const DiagramContextProvider = (props) =>{
    const [diagram, setDiagram] = useState({nombre: '', schemas : []});

    const getTable = (schema) => {
        const table = diagram.schemas.find((s) => {
            if (s.nombre === schema){
                return s
            }
        })?.tablas

        return table
    }
    
    useEffect(() => {
        console.log(diagram)
    }, [diagram])
   
    
    return(
        <DiagramContext.Provider  value={{diagram,setDiagram,getTable}}>
            {props.children}
        </DiagramContext.Provider>
    )
}
