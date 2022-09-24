import { ListGroupItem } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const schemas=['Schema1','Scehma2','Schema3'];

const Schema = () => {

  return (

    <ListGroup>
      <ListGroup.Item><Form.Label>Esquemas disponibles</Form.Label>
      </ListGroup.Item>  

      {schemas.map((item,index)=>{
        return  <ListGroup.Item>
                  <Form.Check type="switch" key={index} label={item}/>
                </ListGroup.Item>          
      })}
      <ListGroupItem>          
        <Button variant="primary" size="lg">Seleccionar tablas</Button>
      </ListGroupItem>

    </ListGroup>



  );
}


export default Schema;

