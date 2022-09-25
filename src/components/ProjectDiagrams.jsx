import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import { useGetProjects } from '../hooks/useProjects';
import { useContext } from "react"
import { ProjectContext } from "../context/ProjectContext"

import NewDiagram from './NewDiagram';

const ProjectDiagrams = ({proIndex}) => {
    const {fetching} = useGetProjects()
    const {projects, setProjects} = useContext(ProjectContext) 

    if (fetching) return <h5>Loading</h5>;

    const handleClick = async (index) => {
        console.log(projects[proIndex]);
        /*
        const updatedProjects = [...projects]
        updatedProjects.splice(index,1)
        setProjects(updatedProjects)*/
    } 

    
    
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
                            <Button variant="primary" key={index}>Abrir</Button>
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