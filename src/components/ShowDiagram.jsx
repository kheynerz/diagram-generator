import PlantImage from "./PlantImage"
import  Button from "react-bootstrap/Button"
import { Navigate } from "react-router"
import { useState } from "react"


const ShowDiagram = () => {
    const [back, setBack] = useState(false)
    if (back) return <Navigate to={'/login'}/>
    return (
    <>
        <div style={{width: '100%'}}>
            <PlantImage />
        </div>

        <Button variant="primary" size="lg" style={{marginTop: '15px'}} onClick={() => setBack(true)}>
            Volver a proyectos
        </Button>
    </>
    ); 
}

export default ShowDiagram