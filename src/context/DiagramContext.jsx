import { createContext,useState } from "react";

export const DiagramContext = createContext();

export const DiagramContextProvider = (props) =>{
    const [diagram, setDiagram] = useState({
      nombre: "diagrama1",
      schemas: [
        { nombre: "public", activated: true, tablas: [] },
        {
          nombre: "admi",
          activated: true,
          tablas: [
            {
              nombre: "congresos",
              activated: true,
              atributos: [
                { nombre: "id", activated: true, dato: "integer" },
                {
                  nombre: "nombre",
                  activated: true,
                  dato: "character varying",
                },
                {
                  nombre: "fecha_ini",
                  activated: true,
                  dato: "timestamp without time zone",
                },
                {
                  nombre: "fecha_fin",
                  activated: true,
                  dato: "timestamp without time zone",
                },
                { nombre: "lugar", activated: true, dato: "character varying" },
              ],
              constraints: [],
            },
            {
              nombre: "actividades",
              activated: true,
              atributos: [
                { nombre: "id", activated: true, dato: "integer" },
                {
                  nombre: "nombre",
                  activated: true,
                  dato: "character varying",
                },
                {
                  nombre: "fecha_ini",
                  activated: true,
                  dato: "timestamp without time zone",
                },
                {
                  nombre: "fecha_fin",
                  activated: true,
                  dato: "timestamp without time zone",
                },
                { nombre: "id_congreso", activated: true, dato: "integer" },
              ],
              constraints: [
                {
                  schema: "admi",
                  table: "actividades",
                  col: "id_congreso",
                  constraint_name: "fk_id_congreso_actividades",
                  foreign_schema: "admi",
                  foreign_table: "congresos",
                  foreign_col: "id",
                  card_l: "",
                  card_r: "",
                  rol_l: "",
                  rol_r: "",
                  type: "2",
                  activated: true,
                },
              ],
            },
            {
              nombre: "lugares",
              activated: true,
              atributos: [
                { nombre: "id", activated: true, dato: "integer" },
                {
                  nombre: "nombre",
                  activated: true,
                  dato: "character varying",
                },
                { nombre: "cupo", activated: true, dato: "smallint" },
              ],
              constraints: [],
            },
            {
              nombre: "lugaresactividades",
              activated: true,
              atributos: [
                { nombre: "id_lugar", activated: true, dato: "integer" },
                { nombre: "id_actividad", activated: true, dato: "integer" },
              ],
              constraints: [
                {
                  schema: "admi",
                  table: "lugaresactividades",
                  col: "id_lugar",
                  constraint_name: "fk_id_lugar_lugaresactividades",
                  foreign_schema: "admi",
                  foreign_table: "lugares",
                  foreign_col: "id",
                  card_l: "",
                  card_r: "",
                  rol_l: "",
                  rol_r: "",
                  type: "2",
                  activated: true,
                },
                {
                  schema: "admi",
                  table: "lugaresactividades",
                  col: "id_actividad",
                  constraint_name: "fk_id_actividad_lugaresactividades",
                  foreign_schema: "admi",
                  foreign_table: "actividades",
                  foreign_col: "id",
                  card_l: "",
                  card_r: "",
                  rol_l: "",
                  rol_r: "",
                  type: "2",
                  activated: true,
                },
              ],
            },
            {
              nombre: "ponencias",
              activated: true,
              atributos: [
                { nombre: "id", activated: true, dato: "integer" },
                {
                  nombre: "resumen",
                  activated: true,
                  dato: "character varying",
                },
                {
                  nombre: "fecha",
                  activated: true,
                  dato: "timestamp without time zone",
                },
              ],
              constraints: [
                {
                  schema: "admi",
                  table: "ponencias",
                  col: "id",
                  constraint_name: "fk_id_ponencias",
                  foreign_schema: "admi",
                  foreign_table: "actividades",
                  foreign_col: "id",
                  card_l: "",
                  card_r: "",
                  rol_l: "",
                  rol_r: "",
                  type: "2",
                  activated: true,
                },
              ],
            },
            {
              nombre: "talleres",
              activated: true,
              atributos: [
                { nombre: "id", activated: true, dato: "integer" },
                {
                  nombre: "duracion",
                  activated: true,
                  dato: "time without time zone",
                },
                { nombre: "cupo", activated: true, dato: "smallint" },
                {
                  nombre: "requisitos",
                  activated: true,
                  dato: "character varying",
                },
                {
                  nombre: "fecha",
                  activated: true,
                  dato: "timestamp without time zone",
                },
              ],
              constraints: [
                {
                  schema: "admi",
                  table: "talleres",
                  col: "id",
                  constraint_name: "fk_id_talleres",
                  foreign_schema: "admi",
                  foreign_table: "actividades",
                  foreign_col: "id",
                  card_l: "",
                  card_r: "",
                  rol_l: "",
                  rol_r: "",
                  type: "2",
                  activated: true,
                },
              ],
            },
            {
              nombre: "usuarios",
              activated: true,
              atributos: [
                { nombre: "id", activated: true, dato: "integer" },
                {
                  nombre: "nombre",
                  activated: true,
                  dato: "character varying",
                },
                {
                  nombre: "apellido1",
                  activated: true,
                  dato: "character varying",
                },
                {
                  nombre: "apellido2",
                  activated: true,
                  dato: "character varying",
                },
                { nombre: "genero", activated: true, dato: "character" },
                {
                  nombre: "fecha_nac",
                  activated: true,
                  dato: "timestamp without time zone",
                },
                { nombre: "email", activated: true, dato: "character varying" },
              ],
              constraints: [],
            },
            {
              nombre: "usuarios_actividades",
              activated: true,
              atributos: [
                { nombre: "id_usuario", activated: true, dato: "integer" },
                { nombre: "id_actividad", activated: true, dato: "integer" },
              ],
              constraints: [
                {
                  schema: "admi",
                  table: "usuarios_actividades",
                  col: "id_usuario",
                  constraint_name: "fk_id_usuario_usuarios_actividades",
                  foreign_schema: "admi",
                  foreign_table: "usuarios",
                  foreign_col: "id",
                  card_l: "",
                  card_r: "",
                  rol_l: "",
                  rol_r: "",
                  type: "2",
                  activated: true,
                },
                {
                  schema: "admi",
                  table: "usuarios_actividades",
                  col: "id_actividad",
                  constraint_name: "fkactividad",
                  foreign_schema: "admi",
                  foreign_table: "actividades",
                  foreign_col: "id",
                  card_l: "",
                  card_r: "",
                  rol_l: "",
                  rol_r: "",
                  type: "2",
                  activated: true,
                },
              ],
            },
          ],
        },
        {
          nombre: "com",
          activated: true,
          tablas: [
            {
              nombre: "mensajes",
              activated: true,
              atributos: [
                {
                  nombre: "fecha",
                  activated: true,
                  dato: "timestamp without time zone",
                },
                {
                  nombre: "contenido",
                  activated: true,
                  dato: "character varying",
                },
                { nombre: "id_emisor", activated: true, dato: "integer" },
                { nombre: "id_receptor", activated: true, dato: "integer" },
              ],
              constraints: [
                {
                  schema: "com",
                  table: "mensajes",
                  col: "id_emisor",
                  constraint_name: "fk_id_emisor_mensajes",
                  foreign_schema: "admi",
                  foreign_table: "usuarios",
                  foreign_col: "id",
                  card_l: "",
                  card_r: "",
                  rol_l: "",
                  rol_r: "",
                  type: "2",
                  activated: true,
                },
                {
                  schema: "com",
                  table: "mensajes",
                  col: "id_receptor",
                  constraint_name: "fk_id_receptor_mensajes",
                  foreign_schema: "admi",
                  foreign_table: "usuarios",
                  foreign_col: "id",
                  card_l: "",
                  card_r: "",
                  rol_l: "",
                  rol_r: "",
                  type: "2",
                  activated: true,
                },
              ],
            },
          ],
        },
        {
          nombre: "media",
          activated: true,
          tablas: [
            {
              nombre: "archivos",
              activated: true,
              atributos: [
                { nombre: "id", activated: true, dato: "integer" },
                {
                  nombre: "nombre",
                  activated: true,
                  dato: "character varying",
                },
                { nombre: "archivo", activated: true, dato: "text" },
                { nombre: "id_usuario", activated: true, dato: "integer" },
              ],
              constraints: [
                {
                  schema: "media",
                  table: "archivos",
                  col: "id_usuario",
                  constraint_name: "fk_id",
                  foreign_schema: "admi",
                  foreign_table: "usuarios",
                  foreign_col: "id",
                  card_l: "",
                  card_r: "",
                  rol_l: "",
                  rol_r: "",
                  type: "2",
                  activated: true,
                },
              ],
            },
          ],
        },
      ],
    });

    const getTable = (schema) => {
        const table = diagram.schemas.find((s) => {
            if (s.nombre === schema){
                return s
            }
        })?.tablas

        return table
    }

    return(
        <DiagramContext.Provider  value={{diagram,setDiagram,getTable}}>
            {props.children}
        </DiagramContext.Provider>
    )
}
