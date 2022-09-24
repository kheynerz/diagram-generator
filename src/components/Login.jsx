import {useState, useContext}  from 'react'
import { CredentialsContext } from '../context/CredentialsContext';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import CheckInstall from './CheckInstall'
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const {credentials, setCredentials} = useContext(CredentialsContext);
  const {auth, setAuth} = useContext(AuthContext)
  const [loginData, updateLoginData] = useState(credentials);
  
  const handleChange = (e) => {
    updateLoginData({
      ...loginData,
      // Recortar cualquier espacio en blanco
      [e.target.name]: e.target.value.trim()
    });
  
  };

  const handleClick = () => {
    setCredentials(loginData)
    setAuth(true)
  }

  if (auth) return <CheckInstall />

  return (
    <Form>
      <FloatingLabel
        controlId="formBasicDireccion"
        label="Direccion del servidor"
        className="mb-3"
      >
        <Form.Control onChange={handleChange} type="text" placeholder="Dirección del servidor" name="host"/>
      </FloatingLabel>

      <FloatingLabel
        className="mb-3"
        label="Nombre de BD"
        controlId="formBasicNombre"
      >
        <Form.Control onChange={handleChange} type="text" placeholder="Nombre de base de datos" name="database"/>
      </FloatingLabel>

      <FloatingLabel
        className="mb-3"
        label="Puerto"
        controlId="formBasicPuerto"
      >
        <Form.Control onChange={handleChange} type="text" placeholder="Puerto" name="port" />
      </FloatingLabel>

      <FloatingLabel
        className="mb-3"
        label="Usuario"
        controlId="formBasicUsuario"
      >
        <Form.Control onChange={handleChange} type="text" placeholder="Usuario" name="user" />
      </FloatingLabel>

      <FloatingLabel className="mb-3" label="Clave" controlId="formBasicClave">
        <Form.Control onChange={handleChange} type="text" placeholder="Clave" name="password"/>
      </FloatingLabel>
      
      <Button onClick={handleClick} variant="primary" size="lg" >
        Conectar
      </Button>
    </Form>
  )
}

export default Login