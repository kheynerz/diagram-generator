import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import { useGetProjects } from '../hooks/useProjects';
import { useContext,useState, useEffect } from "react"
import { ProjectContext } from "../context/ProjectContext"

import NewDiagram from './NewDiagram';
import Diagram from './Diagram';
import { DiagramContext } from '../context/DiagramContext';
import { useStucture } from '../hooks/useStructure';

import { Navigate } from 'react-router-dom';


const ProjectDiagrams = ({proIndex}) => {
    const {fetching} = useGetProjects()
    const {fetching : fetchingStructure} = useStucture()
    
    const {projects, setProjects} = useContext(ProjectContext) 
    const {setDiagram} = useContext(DiagramContext)
    
    const [index, setIndex] = useState(-1)
    const [show, setShow] = useState(false)


    useEffect(() => {
        if(index !== -1){
            const dia = {...projects[proIndex].diagramas[index]};
            setDiagram(dia);
        }
    }, [index])

    const handleClick = async (index) => {
        const updatedProjects = [...projects]
        updatedProjects[proIndex].diagramas.splice(index,1)
        setProjects(updatedProjects)
    } 

    if (fetching || fetchingStructure) return <h5>Loading</h5>;

    if (show) return <Navigate to="/showDiagram"/>
   
    if (index !== -1) return <Diagram diaIndex={index} pIndex={proIndex}/>

    return (
        <>
            <h1 style={{textAlign: 'left', margin:'10px'}}>Diagramas</h1>
                <div style={{display: 'flex' , flexWrap:'Wrap'}}>
                    {projects[proIndex].diagramas.length ? projects[proIndex].diagramas.map((diagram,index) => (
                        <Card key={index} style={{ width: '18rem' , margin:'10px'}}>
                        <CloseButton onClick={() => handleClick(index)}></CloseButton>
                        <Card.Body>    
                            <Card.Title>{diagram.nombre}</Card.Title>
                            <hr></hr>
                            <Button variant="primary" onClick={() => setIndex(index)}>Modificar</Button>
                            <Button style={{marginLeft : '10px'}}variant="primary" onClick={() => {
                                setIndex(index)
                                setShow(true)
                            }}>Mostrar</Button>
                        </Card.Body>
                        </Card>
                    )): null}
                    <Card style={{ width: '18rem' , margin:'10px'}}>
                        <Card.Body>
                            <NewDiagram pIndex={proIndex}/>
                        </Card.Body>
                    </Card>
                </div>
        </>
    );
}


export default ProjectDiagrams;