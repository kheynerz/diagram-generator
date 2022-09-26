import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { CredentialsContext } from '../context/CredentialsContext'; 

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { newProjects } from '../helpers/projects'; 
import { ProjectContext } from '../context/ProjectContext';
import {StructureContext} from '../context/StructureContext';

const NewDiagram = ({pIndex}) => {
    const [diagram, setDiagram] = useState({nombre:'',schemas:[]});
    const credentials = useContext(CredentialsContext).credentials
    const {projects, setProjects} = useContext(ProjectContext) 
    const {structure} = useContext(StructureContext)
  
    useEffect(() => {
      setDiagram({nombre:'',schemas: [...structure]})
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target
        setDiagram({
            ...diagram, [name] : value
        });
    };

    const handleClick = async () => {    
        if( diagram.nombre != ""){      
            let newProject = projects[pIndex]
            newProject.diagramas = newProject.diagramas.length ? [...newProject.diagramas, diagram] : [diagram]

            let newProjects = [...projects]
            newProjects.splice(pIndex, 1)
            newProjects.splice(pIndex, 0, newProject);

            console.log(newProjects);
            setProjects(newProjects)
        }
    } 

    useEffect(() => {
        newProjects(credentials, projects)
    }, [projects]);


    

    return (
      <Form>
        <FloatingLabel className="mb-3" label="Nombre" controlId="nombre">
          <Form.Control onChange={handleChange} type="text" placeholder="Nombre diagrama" name="nombre" />
        </FloatingLabel>
        
        <Button onClick={handleClick} variant="primary" size="lg" >
          Crear
        </Button>
      </Form>
    );
}

export default NewDiagram