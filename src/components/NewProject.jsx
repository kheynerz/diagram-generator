import React from 'react'
import { useContext, useState } from 'react'
import { StructureContext } from '../context/StructureContext'

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const NewProject = () => {
    const [project, setProject] = useState({nombre:'',description: ''});
  
    const handleChange = (e) => {
        const {id, value} = e.target
        setProject({
          ...project, [id] : value
        });
        
        console.log(project);
      };

    return (
      <>
        <FloatingLabel
          controlId="nombre"
          label="Nombre proyecto"
          className="mb-3"
        >
          <Form.Control type="text" placeholder="Nombre Proyecto" onChange={handleChange}/>
        </FloatingLabel>
        <FloatingLabel controlId="description" label="Descripción">
          <Form.Control type="text" placeholder="Descripción" onChange={handleChange}/>
        </FloatingLabel>
      </>
    );
}

export default NewProject