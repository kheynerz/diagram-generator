CREATE SCHEMA IF NOT EXISTS plantuml_generated;

CREATE TABLE IF NOT EXISTS plantuml_generated.projects(
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(20) UNIQUE NOT NULL,
	projects JSON NOT NULL
);

CREATE OR REPLACE FUNCTION plantuml_generated.get_schemas()
RETURNS TABLE (s_name VARCHAR) 
SECURITY DEFINER
AS $$
BEGIN
	RETURN QUERY SELECT schema_name::VARCHAR FROM information_schema.schemata 
		WHERE schema_name NOT IN ('pg_catalog', 'pg_toast','information_schema', 'plantuml_generated');
END
$$
LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION plantuml_generated.getConstraints(p_schema varchar, p_table_name varchar)
RETURNS VARCHAR
SECURITY DEFINER
AS $$
DECLARE
	curs_constr REFCURSOR;
	
	res varchar;
	
	constr_name varchar;
	col_name varchar;
	fn_ts varchar;
	fn_tn varchar;
	fn_col varchar;
	
	
	constraint_found BOOL;
BEGIN
		
		res := '[';
		constraint_found := false;
		OPEN curs_constr FOR SELECT
			tc.constraint_name, 
			kcu.column_name, 
			ccu.table_schema AS foreign_table_schema,
			ccu.table_name AS foreign_table_name,
			ccu.column_name AS foreign_column_name 
		FROM 
			information_schema.table_constraints AS tc 
			JOIN information_schema.key_column_usage AS kcu
			  ON tc.constraint_name = kcu.constraint_name
			JOIN information_schema.constraint_column_usage AS ccu
			  ON ccu.constraint_name = tc.constraint_name
		WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name= p_table_name AND tc.table_schema = p_schema;
		
		LOOP 
			FETCH curs_constr into constr_name, col_name, fn_ts, fn_tn, fn_col;
			IF NOT FOUND THEN
			
				IF constraint_found THEN 
					res := SUBSTRING(res, 1, LENGTH(res)-1);
				END IF;
				
				res := res || ']';
				
				EXIT;
			END IF;
			
			res := res || '{' || '"schema" : "' ||  p_schema || '",' ||
											'"table" : "' || p_table_name || '",' || 
											'"col" : "' || col_name  || '",' ||
											'"constraint_name" : "' || constr_name  || '",' ||
											'"foreign_schema" : "' || fn_ts  || '",' ||
											'"foreign_table" : "' || fn_tn  || '",' ||
											'"foreign_col" : "' || fn_col  || '"},';
			
			constraint_found := true;
			
		END LOOP;
		
		CLOSE curs_constr;
	
	RETURN res;

END
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION plantuml_generated.get_json()
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
	
	
	v_constraints VARCHAR;
	
	v_tables_found BOOL;
	v_columns_found BOOL;
BEGIN
	v_json := '[';
	v_tables_found = 'false';
	v_columns_found = 'false';
	
	OPEN v_schemas FOR SELECT plantuml_generated.get_schemas();
	LOOP 
		FETCH v_schemas INTO v_schema;
		IF FOUND THEN
			v_tables_found = 'false';
			v_json := v_json || '{"nombre" : "'||v_schema || '",' || '"tablas": [';
			OPEN v_tables FOR SELECT table_name::VARCHAR, table_schema::VARCHAR
						FROM information_schema.tables
						WHERE table_type = 'BASE TABLE' AND table_schema = v_schema;
			LOOP
				FETCH v_tables INTO v_table_name, v_table_schema;
				IF FOUND THEN
					v_tables_found = 'true';
					v_columns_found = 'false';
					v_json := v_json || '{' || '"nombre" : "' || v_table_name || '",' || '"atributos" : [';
					OPEN v_columns FOR SELECT column_name::VARCHAR, data_type::VARCHAR 
						FROM information_schema.columns 
						WHERE table_name = v_table_name AND table_schema = v_table_schema;
					LOOP
						FETCH v_columns into v_column_name, v_data_type;
						IF FOUND THEN
							v_columns_found = 'true';
							v_json := v_json || '{' || '"nombre" : "' || v_column_name || '","dato" : "' || v_data_type || '"},';
						ELSE
							RAISE NOTICE '%',v_columns_found;	
							IF v_columns_found THEN
								v_json := SUBSTRING(v_json,1,LENGTH(v_json)-1);
							END IF;
							v_json := v_json || ']';
							EXIT;
						END IF;
					
					END LOOP;
					CLOSE v_columns;
					
					SELECT plantuml_generated.getConstraints(v_table_schema,v_table_name) into v_constraints;
					
					v_json := v_json || ',"constraints" : ' || v_constraints;
					 
					v_json := v_json || '},';
				ELSE
					IF v_tables_found THEN
						v_json := SUBSTRING(v_json,1,LENGTH(v_json)-1);
					END IF;
					v_json := v_json || ']';
					EXIT;
				END IF;
			END LOOP;
			CLOSE v_tables;
			v_json := v_json || '},';
		ELSE
			EXIT;
		End If;
	END LOOP;
	
	CLOSE v_schemas;
	v_json := SUBSTRING(v_json,1,LENGTH(v_json)-1) || ']';
	
	RETURN v_json;
END
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION plantuml_generated.get_projects(p_username varchar(20))
RETURNS JSON
SECURITY DEFINER
AS $$
DECLARE
    usernameExists BOOL;
	projectsJson JSON;
BEGIN 
    SELECT COUNT(projects) > 0 FROM plantuml_generated.projects 
	WHERE username = p_username
    INTO usernameExists;
	
	projectsJson := '{}';
	IF (usernameExists) THEN
		SELECT projects FROM plantuml_generated.projects 
		WHERE username = p_username
		INTO projectsJson;
	END IF; 
	
	RETURN projectsJson;
END
$$
LANGUAGE 'plpgsql';
