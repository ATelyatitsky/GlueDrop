-- TABLE
CREATE TABLE demo (id integer primary key, name varchar(20), hint text );
CREATE TABLE login (
	id integer PRIMARY KEY,
	login text NOT NULL,
	password text NOT NULL,
  	person_id integer NOT NULL
);
CREATE TABLE person (
	id integer PRIMARY KEY,
  	login_id InTEGER,
	name text NOT NULL,
	family text NOT NULL,
  	patronymic integer,
  	birthDate DateTime NOT NULL,
  	gender integer NOT NULL,
  	diabetType integer NOT NULL,
  	carbohydrates integer NOT NULL,
  FOREIGN KEY (login_id) REFERENCES login (id) 
			ON DELETE CASCADE ON UPDATE NO ACTION
);
 
-- INDEX
 
-- TRIGGER
 
-- VIEW
 
