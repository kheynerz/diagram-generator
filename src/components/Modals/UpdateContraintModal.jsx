import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import  Form  from 'react-bootstrap/Form';

import { useState, useEffect} from 'react';


const UpdateConstraintModal = ({c, updateConstraint}) => {
  const [show, setShow] = useState(true)
  const [constraint, setConstraint] = useState({})

  const options = ['Herencia', 'Agregación','Asociación','Composición']

  useEffect(() => {
    setConstraint(c)
  }, [])
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setConstraint({...constraint,[name]: value})
  };


  const handleClick = () => {
    setConstraint({
      ...constraint,
      schema: constraint.foreign_schema,
      table: constraint.foreign_table,
      col: constraint.foreign_col,
      foreign_schema : constraint.schema,
      foreign_table : constraint.table,
      foreign_col : constraint.col
    });
  }

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cambios en llave: {constraint.constraint_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div >
          <h5 style={{ display: "inline" }}>
            {constraint.table} <img src="/src/assets/arrow-right.svg"></img>{" "}
            {constraint.foreign_table}
          </h5>
          <button
            style={{
              display: "inline" ,
              marginLeft: "5px",
              border: "1px solid gray",
              borderRadius : '5px',
              backgroundColor: "white",
            }}

            onClick={handleClick}
          >
            <img src="/src/assets/arrow-left-right.svg" style={{marginBot : '5px'}}></img>
          </button>
        </div>

        <h5>Cardinalidad</h5>
        <div style={{ display: "flex" }}>
          <FloatingLabel
            controlId="card_l"
            label="Cardinalidad izquierda"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Cardinalidad izquierda"
              name="card_l"
              defaultValue={constraint.card_l}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel
            style={{ marginLeft: "10px" }}
            controlId="card_r"
            label="Cardinalidad derecha"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Cardinalidad derecha"
              name="card_r"
              defaultValue={constraint.card_r}
              onChange={handleChange}
            />
          </FloatingLabel>
        </div>

        <h5>Roles</h5>
        <div style={{ display: "flex" }}>
          <FloatingLabel
            controlId="rol_l"
            label="Rol izquierda"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Rol izquierda"
              name="rol_l"
              defaultValue={constraint.rol_l}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel
            style={{ marginLeft: "10px" }}
            controlId="rol_r"
            label="Rol derecha"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Rol derecha"
              name="rol_r"
              defaultValue={constraint.rol_r}
              onChange={handleChange}
            />
          </FloatingLabel>
        </div>

        <Form.Control as="select" name="type" onChange={handleChange} value={constraint.type}>
          { options.map((opt,i) => (<option key={i} value={i}>{ opt }</option>)) }
        </Form.Control>
    
      </Modal.Body>
      <Modal.Footer>
        <Button id="btnUpdate" onClick={() => {setShow(false); updateConstraint(constraint)}}>
        Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateConstraintModal
