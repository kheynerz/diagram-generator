CREATE SCHEMA IF NOT EXISTS plantuml_generated;

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


CREATE OR REPLACE FUNCTION plantuml_generated.get_tables()
RETURNS TABLE (t_name VARCHAR, t_schema VARCHAR) 
SECURITY DEFINER
AS $$
BEGIN
	RETURN QUERY SELECT table_name::VARCHAR, table_schema::VARCHAR
		FROM information_schema.tables
		WHERE table_type = 'BASE TABLE' AND table_schema NOT IN ('pg_catalog','information_schema');
END
$$
LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION plantuml_generated.get_table_data(p_table_name VARCHAR, p_table_schema VARCHAR)
RETURNS TABLE (
        t_column VARCHAR,
        t_data_type VARCHAR) 
SECURITY DEFINER
AS $$
BEGIN
	RETURN QUERY SELECT column_name::VARCHAR, data_type::VARCHAR 
		FROM information_schema.columns 
		WHERE table_name = p_table_name AND table_schema = p_table_schema;
END
$$
LANGUAGE 'plpgsql';


CREATE OR REPLACE FUNCTION plantuml_generated.get_json()
RETURNS JSON
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
	v_json := '{';
	v_tables_found = 'false';
	v_columns_found = 'false';
	
	OPEN v_schemas FOR SELECT plantuml_generated.get_schemas();
	LOOP 
		FETCH v_schemas INTO v_schema;
		IF FOUND THEN
			v_tables_found = 'false';
			v_json := v_json || E'\n\t"' || v_schema || '" : {';
			OPEN v_tables FOR SELECT table_name::VARCHAR, table_schema::VARCHAR
						FROM information_schema.tables
						WHERE table_type = 'BASE TABLE' AND table_schema = v_schema;
			LOOP
				FETCH v_tables INTO v_table_name, v_table_schema;
				IF FOUND THEN
					v_tables_found = 'true';
					v_columns_found = 'false';
					v_json := v_json || E'\n\t\t"' || v_table_name || '" : {';
					OPEN v_columns FOR SELECT column_name::VARCHAR, data_type::VARCHAR 
						FROM information_schema.columns 
						WHERE table_name = v_table_name AND table_schema = v_table_schema;
					LOOP
						FETCH v_columns into v_column_name, v_data_type;
						IF FOUND THEN
							v_columns_found = 'true';
							v_json := v_json || E'\n\t\t\t"' || v_column_name || '" : "' || v_data_type || '",';
						ELSE
							RAISE NOTICE '%',v_columns_found;	
							IF v_columns_found THEN
								v_json := SUBSTRING(v_json,1,LENGTH(v_json)-1);
							END IF;
							v_json := v_json || E'\n\t\t}';
							EXIT;
						END IF;
					
					END LOOP;
					
					CLOSE v_columns;
					v_json := v_json || ',';
				ELSE
					IF v_tables_found THEN
						v_json := SUBSTRING(v_json,1,LENGTH(v_json)-1);
					END IF;
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
	v_json := SUBSTRING(v_json,1,LENGTH(v_json)-1) || E'\n}';
	
	RAISE NOTICE E'\n%',v_json;
	
	RETURN v_json::JSON;
END
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION plantuml_generated.check_schema()
RETURNS BOOL
SECURITY DEFINER
AS $$
DECLARE
	checked BOOL;
BEGIN 
	SELECT (COUNT(routine_name) = 4) from information_schema.routines
	WHERE routines.specific_schema='plantuml_generated'
		AND routine_name in ('get_schemas', 'get_tables', 'get_table_data', 'get_json')
	INTO checked;
	RETURN checked;
END
$$
LANGUAGE 'plpgsql';
