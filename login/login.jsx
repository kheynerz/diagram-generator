import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function Login() {
    return (
      <Form>
        <FloatingLabel controlId="formBasicDireccion" label="Direccion del servidor" className="mb-3" >
            <Form.Control type="text" placeholder="Dirección del servidor" />
        </FloatingLabel>
        
        <FloatingLabel  className="mb-3"label="Nombre de BD" controlId="formBasicNombre">
          <Form.Control type="text" placeholder="Nombre de base de datos" />
        </FloatingLabel >

        <FloatingLabel  className="mb-3" label='Puerto' controlId="formBasicPuerto">
          <Form.Control type="text" placeholder="Puerto" />
        </FloatingLabel >

        <FloatingLabel  className="mb-3" label="Usuario" controlId="formBasicUsuario">
          <Form.Control type="text" placeholder="Usuario" />
        </FloatingLabel >

        <FloatingLabel  className="mb-3" label="Clave" controlId="formBasicClave">
          <Form.Control type="text" placeholder="Clave" />
        </FloatingLabel>
        <Button variant="primary" size="lg">
          Conectar
        </Button>
      </Form>
    );
  }
  
  export default Login;