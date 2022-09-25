import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useContext,useState } from 'react';
import { StructureContext } from '../context/StructureContext'
import { DiagramContext } from '../context/DiagramContext'

import UpdateConstraintModal from './Modals/UpdateContraintModal';

const Tables = ({schema, updateTable}) => {
  const { getTable : getTableStructure } = useContext(StructureContext);
  const { getTable } = useContext(DiagramContext);
  const [tables, setTables] = useState([])
  
  const [modal, setModal] = useState(false)
  const [contraint, setContraint] = useState({})

  useEffect(() => {
    let tableData = getTable(schema.nombre)
    if (tableData){
      const tableStruct = getTableStructure(schema.nombre)
      let activatedTables = []
      let disabledTables = tableStruct.filter((ts) => {
        let found = false;
        found = tableData.find((td) => {
          if (td.nombre === ts.nombre){
            //Mapear en los atributos de tableData para ver cuales no estan y agregarlos 
            const atributos = ts.atributos.map((tsa) => {
              let atrFound = false;
              atrFound = td.atributos.find((tda) => {
                if (tsa.nombre === tda.nombre) {
                  return tda;
                }
              });

              if (atrFound) {
                return { ...atrFound, activated: true };
              } else {
                return { ...tsa, activated: false };
              }
            });
            activatedTables.push({nombre: td.nombre,atributos,  constraints: td.constraints,  activated : true})
            return true
          }
        })
        if (!found){
          return ts
        }
      })
       let newTables = disabledTables.map((t) => ({
        nombre: t.nombre,
        atributos : t.atributos.map((a) => ({...a, activated : false})),
        constraints: t.constraints,
        activated: false,
      }));
      
      setTables([...activatedTables, ...newTables]) 

    }else{
      setTables(getTableStructure(schema.nombre).map((t) => ({
        nombre: t.nombre,
        atributos : t.atributos.map((a) => ({...a, activated : false})),
        activated: false,
      })))
    }

  }, [])

  useEffect(() => {
    updateTable(schema, tables)
  }, [tables])
  

  const handleChange = (e, tabla) => {
    const {name, checked} = e.target
    setTables(tables.map((t)=>{
      if (t.nombre === tabla){
        t.atributos.map(a => {
          if (a.nombre === name){
            a.activated = checked;
          }
          return a
        })
      }
      return t
    }))
  }

  const handleTableChange = (e) => {
    const {name, checked} = e.target
    
    setTables(tables.map((t) => {
      if (t.nombre === name){
        t.activated = checked
      }
      return t
    }))
  }

  const handleConstChange = (e,c,index) => {
    const {checked} = e.target;

    setTables([...tables].map((t) => {
      if(t.nombre === c.table){
        let consts = t.constraints.map((con, i) => ({...con, activated : i === index ? checked : con.activated}))
        return {...t, constraints : consts}
      }
      return t
    }))

  }



  const handleClick = (_, c) => {
    setContraint(c)
    setModal(true)
  }

  const updateConstraint = (c) => {
    setTables([...tables].map(t => {
      let cons = t.constraints.map((con) => {
        if (con.constraint_name === c.constraint_name){
          return c
        }
        return con
      })
      return {...t, constraints : cons}
    })
    );
  }

  if(tables.length === 0) return <h4>No hay tablas en el esquema</h4>

  return (
    <>
    {modal && <UpdateConstraintModal c={contraint} updateConstraint={updateConstraint}/>}
    <Form onSubmit={(e) => e.preventDefault()}   style={{display: 'flex' , flexWrap:'Wrap'}}>  
        {tables.map((tabla,index)=>{
                return  <ListGroup style={{margin:'10px'}} key={index}>
                            <ListGroup.Item >
                                <Form.Check style={{display : 'inline'}} type="switch"  name={tabla.nombre} defaultChecked={tabla.activated} onChange={handleTableChange}/>
                                <h5 style={{display : 'inline', marginLeft: '10px'}}>{tabla.nombre}</h5>
                            </ListGroup.Item>  
                            <ListGroup.Item>
                              {tabla.atributos.map(({nombre, dato, activated},j) => {
                                return <Form.Check type="switch" key={j} label={`${nombre} : ${dato}`} name={nombre} defaultChecked={activated} onChange={(e) => handleChange(e,tabla.nombre)}/>
                              })}
                            </ListGroup.Item> 
                            <ListGroup.Item>
                                <h6>Constraints</h6>
                            </ListGroup.Item>
                            <ListGroup.Item>
                              {tabla.constraints.map((c,j) => {
                                let label = `${c.schema !== 'public' ? c.schema+'.' : '' }${c.table} -->`
                                label += `${c.foreign_schema !== 'public' ? c.foreign_schema+'.' : ''}${c.foreign_table}`
                                return <div key={j} >
                                  <Form.Check  type="switch"  label={label} defaultChecked={true} name={j} onChange={(e) => handleConstChange(e,c, j)}/>
                                    <button style={{fontSize : '5px', marginLeft : '5px', border: 'none', backgroundColor: 'white'}} onClick={(e) => handleClick(e, c)} >
                                      <img src='/src/assets/edit.svg'></img>  
                                    </button>
                                </div>
                              })}
                            </ListGroup.Item> 

                        </ListGroup>
            })}
        
    </Form></>
    
      
  );
}

export default Tables;