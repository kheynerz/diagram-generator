import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import { useGetProjects } from '../hooks/useProjects';
import { useContext, useState } from "react"
import { ProjectContext } from "../context/ProjectContext"
import ProjectDiagrams from "./ProjectDiagrams"

import NewProject from './NewProject';

const Project = () => {
    const {fetching} = useGetProjects()
    const {projects, setProjects} = useContext(ProjectContext) 
    const [index, setIndex] = useState(-1)

    if (fetching) return <h5>Loading</h5>;

    const handleClick = async (index) => {
        const updatedProjects = [...projects]
        updatedProjects.splice(index,1)
        setProjects(updatedProjects)
    } 

    if (index !== -1) return <ProjectDiagrams proIndex={index}/>
   
    return (
        <>
            <h1 style={{textAlign: 'left', margin:'10px'}}>Proyectos</h1>
                <div style={{display: 'flex' , flexWrap:'Wrap'}}>
                    {projects.length ? projects.map((project,index) => (
                        <Card key={index} style={{ width: '18rem' , margin:'10px'}}>
                        <CloseButton onClick={() => handleClick(index)}></CloseButton>
                        <Card.Body>    
                            <Card.Title>{project.nombre}</Card.Title>
                            <hr></hr>
                            <Card.Text>
                                {project.descripcion}
                            </Card.Text>
                            <Button variant="primary" key={index} onClick={() => setIndex(index)}>Abrir</Button>
                        </Card.Body>
                        </Card>
                    )): null}
                    <Card style={{ width: '18rem' , margin:'10px'}}>
                        <Card.Body>
                            <NewProject/>
                        </Card.Body>
                    </Card>
                </div>
        </>
    );
}


export default Project;