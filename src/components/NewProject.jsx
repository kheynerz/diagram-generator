import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { CredentialsContext } from '../context/CredentialsContext'; 

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { newProjects } from '../helpers/projects'; 
import { ProjectContext } from '../context/ProjectContext';

const NewProject = () => {
    const [project, setProject] = useState({nombre:'',descripcion: '',diagramas:[]});
    const credentials = useContext(CredentialsContext).credentials
    const {projects, setProjects} = useContext(ProjectContext) 
  
    const handleChange = (e) => {
      const {name, value} = e.target
      setProject({
        ...project, [name] : value
      });
    };

    const handleClick = async () => {
      if( (project.nombre && project.descripcion) != "")
        setProjects(projects.length ? [...projects,project] : [project])
    } 

    useEffect(() => {
      newProjects(credentials, projects)
    }, [projects]);

    return (
      <Form>
        <FloatingLabel
          className="mb-3"
          label="Nombre"
          controlId="nombre"
        >
          <Form.Control onChange={handleChange} type="text" placeholder="Nombre proyecto" name="nombre" />
        </FloatingLabel>

        <FloatingLabel className="mb-3" label="Descripcion" controlId="descripcion">
          <Form.Control onChange={handleChange} type="text" placeholder="Descripcion" name="descripcion"/>
        </FloatingLabel>
        
        <Button onClick={handleClick} variant="primary" size="lg" >
          Crear
        </Button>
      </Form>
    );
}

export default NewProject