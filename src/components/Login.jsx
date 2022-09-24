import React, {useContext}  from 'react'
import { CredentialsContext } from '../context/CredentialsContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


const Login = () => {

  const {credentials} = useContext(CredentialsContext);
  const {setCredentials} = useContext(CredentialsContext);

  const [loginData, updateLoginData] = React.useState(credentials);

  const handleChange = (e) => {
    updateLoginData({
      ...loginData,

      // Recortar cualquier espacio en blanco
      [e.target.name]: e.target.value.trim()
    });
  };

  return (
    <Form>
      <FloatingLabel
        controlId="formBasicDireccion"
        label="Direccion del servidor"
        className="mb-3"
      >
        <Form.Control onChange={handleChange} type="text" placeholder="Dirección del servidor" name="direccion"/>
      </FloatingLabel>

      <FloatingLabel
        className="mb-3"
        label="Nombre de BD"
        controlId="formBasicNombre"
      >
        <Form.Control onChange={handleChange} type="text" placeholder="Nombre de base de datos" name="nombre"/>
      </FloatingLabel>

      <FloatingLabel
        className="mb-3"
        label="Puerto"
        controlId="formBasicPuerto"
      >
        <Form.Control onChange={handleChange} type="text" placeholder="Puerto" name="puerto" />
      </FloatingLabel>

      <FloatingLabel
        className="mb-3"
        label="Usuario"
        controlId="formBasicUsuario"
      >
        <Form.Control onChange={handleChange} type="text" placeholder="Usuario" name="usuario" />
      </FloatingLabel>

      <FloatingLabel className="mb-3" label="Clave" controlId="formBasicClave">
        <Form.Control onChange={handleChange} type="text" placeholder="Clave" name="clave"/>
      </FloatingLabel>
      <Button onClick={() => setCredentials(loginData)} variant="primary" size="lg" >
        Conectar
      </Button>
      <pre>
        {console.log(credentials)}
      </pre>
      
      
    </Form>
  )
}

export default Login