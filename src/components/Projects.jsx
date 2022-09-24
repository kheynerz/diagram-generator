import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useGetProjects } from '../hooks/useGetProjects';


const Projects = () => {
    const {projects, fetching} = useGetProjects()

    if (fetching) return <h5>Loading</h5>;
    
    return (
        <>
            <div style={{display: 'flex' , flexWrap:'Wrap'}}>
                {projects.length ? projects.map((project,index) => (
                    <Card key={index} style={{ width: '18rem' , margin:'10px'}}>
                    <Card.Body>
                        <Card.Title>{project.nombre}</Card.Title>
                        <Card.Text>
                            {project.descripcion}
                        </Card.Text>
                        <Button variant="primary" key={index}>Abrir</Button>
                    </Card.Body>
                    </Card>
                )): <h3>Primer proyecto: </h3>}
                <Button variant="primary" style={{ width: '18rem' , margin:'10px', fontSize:'60px'}}>+</Button>
            </div>
            
        </>
    );
}


export default Projects;