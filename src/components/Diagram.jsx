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

  const [tables, setTables] = useState([]) //Esto es esquemas tambien, me equivoque >:/

  const handleClick = () => {
/* 
    let sche = tables.filter((s) => {
        if (s.activated){
            let tab = s.tablas.filter(t => {
                if(t.activated){
                    let atr = t.atributos.filter(a => {
                        if (a.activated){
                            return a
                        }
                    })

                    console.log("atributos de: ", t.nombre, atr);
                    console.log({...t, atributos : atr});
                    return {...t, atributos : atr}
                }
            })

            console.log("tabs", tab);
            console.log("Schema", {...s, tablas: tab});
            return s
        }
    })
    
    console.log(sche); */

    setDiagram({...diagram, schemas: tables})



    setSelectTables(false)
  }

  const addTable = (schema, newTable) => {
    if (newTable.length === 0) return
    let index = tables.findIndex((t) => t.nombre === schema.nombre)

    if (index === -1){
        setTables([...tables, {...schema, tablas : newTable}])
    }else{
        setTables(tables.map(s => {
            if(s.nombre === schema.nombre){
                s.tablas = newTable
            }
            return s
        }))
    }
    //{...schema, tablas : newTable}
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
          <Tables schema={schema} addTable={addTable} />
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