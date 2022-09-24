import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useGetProjects } from '../hooks/useGetProjects';

import NewProject from './NewProject';

const Project = () => {
    const {projects, fetching} = useGetProjects()

    if (fetching) return <h5>Loading</h5>;
    

    return (
        <>
        <h1>Proyectos</h1>
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
                )): null}
                <Card style={{ width: '18rem' , margin:'10px'}}>
                    <Card.Body>
                        <NewProject/>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}


export default Project;