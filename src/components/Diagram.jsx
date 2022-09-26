import { useEffect, useState, useContext } from 'react'
import { StructureContext } from '../context/StructureContext'
import { DiagramContext } from '../context/DiagramContext'
import { ProjectContext } from '../context/ProjectContext'


import Button from 'react-bootstrap/Button';
import Schema from './Schema'
import Tables from './Tables'
import { Navigate } from 'react-router';

const Diagram = ({diaIndex, pIndex}) => {
  const { structure } = useContext(StructureContext);
  const {diagram, setDiagram } = useContext(DiagramContext);
  const { projects, setProjects } = useContext(ProjectContext);

  const [schemas, setSchemas] = useState([]);

  const [selectSchema, setSelectSchema] = useState(true);
  const [selectTables, setSelectTables] = useState(true);


  const handleClick = () => {
    setDiagram({...diagram, schemas : [...schemas]})
    setSelectTables(false)
  }

  const updateTable = (schema, newTable) => {
    if (newTable.length === 0) return
    setSchemas(schemas.map(s => {
        if(s.nombre === schema.nombre){
            s.tablas = newTable
        }
        return s
    }))
  }

  const saveDiagram = () => {
    const dia = {...diagram, schemas : [...schemas]}
    
    const newProjects = [...projects].map((p,i) => {
      if (i === pIndex){
        let diagramas = p.diagramas.map((d,j) => {
          if (j === diaIndex){
            return dia
          }
          return d
        })
        return {...p, diagramas}
      }
      return p
    })

    setProjects(newProjects)
  }

  useEffect(() => {
    let newSchemas = [...diagram.schemas];
    let diagramSchemas = newSchemas.map((s) => s.nombre);
    let structSchemas = structure.map((s) => s.nombre);
    structSchemas.forEach((e) => {
      if (!diagramSchemas.find((s) => s === e)) {
        newSchemas.push({ nombre: e, activated: false });
      }
    });
    setSchemas(newSchemas);
  }, []);

  if (selectSchema)  return <Schema schemas={schemas} setSchemas={setSchemas} setSelectSchema={setSelectSchema}/>;
 
  if (selectTables) return (
    <>
      {schemas.map((schema, i) => (
        <div key={i}>
          <h3>{schema.nombre}</h3>
          <Tables schema={schema} updateTable={updateTable} />
        </div>
      ))}

      <Button variant="primary" size="lg" onClick={handleClick}>
        Mostrar 
      </Button>

      <Button style={{marginLeft : '50px'}}variant="primary" size="lg" onClick={saveDiagram}>
        Guardar
      </Button>
    </>
  );

  return <Navigate to={'/showDiagram'}/>
}

export default Diagram