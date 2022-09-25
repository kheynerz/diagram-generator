import { useEffect, useState, useContext } from 'react'
import { StructureContext } from '../context/StructureContext'
import { DiagramContext } from '../context/DiagramContext'

import Button from 'react-bootstrap/Button';
import Schema from './Schema'
import Tables from './Tables'
import { Navigate } from 'react-router';

const Diagram = () => {
  const { structure } = useContext(StructureContext);
  const { diagram, setDiagram } = useContext(DiagramContext);
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
        Generar
      </Button>
    </>
  );

  return <Navigate to={'/showDiagram'}/>
}

export default Diagram