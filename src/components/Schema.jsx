import { ListGroupItem } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const Schema = ({schemas, setSchemas, setSelectSchema}) => {
  
  const handleChange = (e) => {
    const {checked, name} = e.target  
    setSchemas([...schemas].map(object => {
      if(object.nombre === name) {
        return {
          ...object,
         activated: checked,
        }
      }
      else return object;
    }))
  }

  const handleClick = () => {
    setSchemas([...schemas].filter(s => {
      if(s.activated) {
        return {nombre : s.nombre}
      }
    }))
    setSelectSchema(false)
  }

  return (
    <ListGroup>
      <ListGroup.Item><Form.Label>Esquemas disponibles</Form.Label>
      </ListGroup.Item>  

      {schemas.map(({nombre, activated},i)=>{
        return  <ListGroup.Item key={i}>
                  <Form.Check type="switch" label={nombre} onChange={handleChange} name={nombre} defaultChecked={activated}/>
                </ListGroup.Item>          
      })}
      <ListGroupItem>          
        <Button variant="primary" size="lg" onClick={handleClick}>Seleccionar tablas</Button>
      </ListGroupItem>

    </ListGroup>



  );
}


export default Schema;

