import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const projectsList=[
    {nombre:'proyecto1', diagramas: {}},
    {nombre:'proyecto2', diagramas: {}}, 
    {nombre:'proyecto3', diagramas: {}},
    {nombre:'proyecto4', diagramas: {}} 
];

const Schema = () => {

    return (
        <>
            <div style={{display: 'flex' , flexWrap:'Wrap'}}>
                {projectsList.map((project,index) => (
                    <Card style={{ width: '18rem' , margin:'10px'}}>
                    <Card.Body>
                        <Card.Title>{project.nombre}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary" key={index}>Abrir</Button>
                    </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    );
}


export default Schema;