import { ListGroupItem } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const tablas=[
    {nombre:'hospital', columnas: ['medicos(string)','camillas(int)']},
    {nombre:'escuela', columnas: ['aulas(int)','profesores(String)']}, 
    {nombre:'hola', columnas: ['aulas(int)','profesores(String)']} ,
    {nombre:'prueba', columnas: ['aulas(int)','profesores(String)']} 
];


function Schema() {

  return (
    <>
    <Form style={{display: 'flex' , flexWrap:'Wrap'}}>  
        {tablas.map((tabla,index)=>{
                return  <ListGroup style={{margin:'10px'}} key={index}>
                            <ListGroup.Item >
                                {tabla.nombre}
                            </ListGroup.Item>  
                            <ListGroup.Item>
                            {tabla.columnas.map((columna,j)=>
                                <Form.Check type="switch" key={j} label={columna}/>
                            )}
                            </ListGroup.Item> 
                        </ListGroup>

       
            })}
        
        
    </Form>
    <Button variant="primary" size="lg">Generar</Button></>
    
      
  );
}


export default Schema;