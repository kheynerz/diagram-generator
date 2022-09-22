import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const CheckInstallModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Instalar esquema de generación de diagramas
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>No se detectaron los procedimientos</h6>
        <p>
          Para el funcionamiento de la aplicación se requiere poder instalar en la base de datos, 
          procedimientos para la obtención de datos para la generación de los diagramas.
          <br/>
          Esta operacion solo la puede realizar un administrador de la base de datos ¿Desea instalar los procedimientos?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button id='btnInstall' onClick={props.onClickInstall}>Instalar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CheckInstallModal
