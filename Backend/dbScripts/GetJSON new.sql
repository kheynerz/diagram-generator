CREATE OR REPLACE FUNCTION plantuml_generated.get_json2()
RETURNS VARCHAR
SECURITY DEFINER
AS $$
DECLARE 
	v_json VARCHAR;
	v_schemas REFCURSOR;
	v_schema VARCHAR;
	v_tables REFCURSOR;
	v_table_name VARCHAR;
	v_table_schema VARCHAR;
	v_columns REFCURSOR;
	v_column_name VARCHAR;
	v_data_type VARCHAR;
	
	v_tables_found BOOL;
	v_columns_found BOOL;
BEGIN
	v_json := E'[\n\t{';
	v_tables_found = 'false';
	v_columns_found = 'false';
	
	OPEN v_schemas FOR SELECT plantuml_generated.get_schemas();
	LOOP 
		FETCH v_schemas INTO v_schema;
		IF FOUND THEN
			v_tables_found = 'false';
			v_json := v_json || E'\n\t' || '"nombre" : "'||v_schema || '",' || E'\n\t "tablas": [';
			OPEN v_tables FOR SELECT table_name::VARCHAR, table_schema::VARCHAR
						FROM information_schema.tables
						WHERE table_type = 'BASE TABLE' AND table_schema = v_schema;
			LOOP
				FETCH v_tables INTO v_table_name, v_table_schema;
				IF FOUND THEN
					v_tables_found = 'true';
					v_columns_found = 'false';
					v_json := v_json || E'\n\t\t{' || '"nombre" : "' || v_table_name || E'",\n\t\t' || '"atributos" : [';
					OPEN v_columns FOR SELECT column_name::VARCHAR, data_type::VARCHAR 
						FROM information_schema.columns 
						WHERE table_name = v_table_name AND table_schema = v_table_schema;
					LOOP
						FETCH v_columns into v_column_name, v_data_type;
						IF FOUND THEN
							v_columns_found = 'true';
							v_json := v_json || E'\n\t\t\t{\n\t\t\t\t' || '"nombre" : "' || v_column_name || E'",\n\t\t\t\t "dato" : "' || v_data_type || E'"\n\t\t\t},';
						ELSE
							RAISE NOTICE '%',v_columns_found;	
							IF v_columns_found THEN
								v_json := SUBSTRING(v_json,1,LENGTH(v_json)-1);
							END IF;
							v_json := v_json || E'\n\t\t]';
							EXIT;
						END IF;
					
					END LOOP;
					
					CLOSE v_columns;
					v_json := v_json || '},';
				ELSE
					IF v_tables_found THEN
						v_json := SUBSTRING(v_json,1,LENGTH(v_json)-1);
					END IF;
					v_json := v_json || E'\n\t\t]';
					EXIT;
				END IF;
			END LOOP;
			CLOSE v_tables;
			v_json := v_json || E'\n\t},';
		ELSE
			EXIT;
		End If;
	END LOOP;
	
	CLOSE v_schemas;
	v_json := SUBSTRING(v_json,1,LENGTH(v_json)-1) || E'\n]';
	
	RAISE NOTICE E'\n%',v_json;
	
	RETURN v_json;
END
$$
LANGUAGE 'plpgsql';


SELECT plantuml_generated.get_json2()

[
	{
	"nombre" : "public",
	 "tablas": [
		{"nombre" : "personas",
		"atributos" : [
			{
				"nombre" : "id",
				 "dato" : "integer"
			},
			{
				"nombre" : "nombre",
				 "dato" : "character varying"
			}
		]},
		{"nombre" : "telefonos",
		"atributos" : [
			{
				"nombre" : "idpersona",
				 "dato" : "integer"
			},
			{
				"nombre" : "telefono",
				 "dato" : "integer"
			}
		]}
		]
	}
]