import './App.css'
import { useState } from 'react';

import { parseUML, getUrl } from './helpers/helpers';


const App = () => {
  const [modalShow, setModalShow] = useState(false);
  
  
  let esquemas = [
    {
      nombre : "public",
      tablas : [
        {
          esquema : "public",
          nombre: "personas",
          atributos: [
            {
              nombre: "id",
              dato: "character",
              constraints: [
                {
                  nombre: "pk_personas",
                  tipo: "p",
                },
              ],
            },
            {
              nombre: "nombre",
              dato: "character varying",
            },
          ],
        },
        {
          esquema : "poos",
          nombre: "telefonos",
          atributos: [
            {
              nombre: "id",
              dato: "character",
              constraints: [
                {
                  nombre: "pk_telefonos",
                  tipo: "p",
                },
                {
                  nombre: "pk_personas",
                  tipo: "f",
                  tabla: "personas",
                  atributo: "id",
                },
              ],
            },
            {
              nombre: "telefono",
              dato: "character varying",
              constraints: [
                {
                  nombre: "pk_telefonos",
                  tipo: "p",
                },
              ],
            },
          ],
        },
      ]
  
    }
  ]
  
  //let src = getUrl()
  
  let src = getUrl(parseUML(esquemas));
  return (
    <div className="App">
      <img src={src}></img>
    </div>
  );
}

export default App



