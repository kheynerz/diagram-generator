import React from 'react'
import { useState } from 'react'


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const NewProject = () => {
    const [project, setProject] = useState({nombre:'',description: ''});
  
    const handleChange = (e) => {
        const {name, value} = e.target
        setProject({
          ...project, [name] : value
        });
      };


    const handleClick = () => {
        console.log(project);
    }

    return (
        <Form>
       
        <FloatingLabel
          className="mb-3"
          label="Nombre"
          controlId="nombre"
        >
          <Form.Control onChange={handleChange} type="text" placeholder="Nombre proyecto" name="nombre" />
        </FloatingLabel>
  
        <FloatingLabel className="mb-3" label="Descripcion" controlId="description">
          <Form.Control onChange={handleChange} type="text" placeholder="Descripcion" name="description"/>
        </FloatingLabel>
        
        <Button onClick={handleClick} variant="primary" size="lg" >
          Crear
        </Button>
      </Form>
    );
}

export default NewProject