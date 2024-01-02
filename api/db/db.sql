create database base_arreglar;
USE base_arreglar;
-- Tabla ROLES
CREATE TABLE ROLES (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(200) NOT NULL,
    UNIQUE (NOMBRE)
);

-- Tabla RUTAS
CREATE TABLE RUTAS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(200) NOT NULL,
    RUTA VARCHAR(200) NOT NULL,
    UNIQUE(NOMBRE, RUTA)
);

-- Tabla USUARIOS
CREATE TABLE USUARIOS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRES VARCHAR(200) NOT NULL,
    USUARIO VARCHAR(200) NOT NULL,
    DNI VARCHAR(8) NOT NULL,
    PASSWORD VARCHAR(200) NOT NULL,
    ROL INT NOT NULL,
    FECHA_REGISTRO DATETIME NOT NULL,
    CONSTRAINT FK_ROLES_USUARIOS FOREIGN KEY (ROL) REFERENCES ROLES(ID),
    UNIQUE (USUARIO, DNI)
);



-- Tabla PROCESOS
CREATE TABLE PROCESOS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    NOMBRE VARCHAR(200) NOT NULL,
    ESTADO BOOLEAN NOT NULL,
    FECHA_REGISTRO DATETIME NOT NULL,
    USUARIO_REGISTRO INT NOT NULL,
    CONSTRAINT FK_USUARIOS_PROCESOS FOREIGN KEY (USUARIO_REGISTRO) REFERENCES USUARIOS(ID),
    UNIQUE (NOMBRE, ESTADO)
);

-- Tabla PAGOS
CREATE TABLE PAGOS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ID_PROCESO INT NOT NULL,
    CODIGO VARCHAR(20) NOT NULL,
    DNI VARCHAR(8) NOT NULL,
    NOMBRE_COMPLETO VARCHAR(200) NOT NULL,
    MONTO VARCHAR(10) NOT NULL,
    ESTADO BOOLEAN NOT NULL,
    USUARIO_REGISTRO INT NOT NULL,
    CONSTRAINT FK_PROCESOS_PAGOS FOREIGN KEY (ID_PROCESO) REFERENCES PROCESOS(ID),
    CONSTRAINT FK_USUARIOS_PAGOS FOREIGN KEY (USUARIO_REGISTRO) REFERENCES USUARIOS(ID),
    UNIQUE (CODIGO, DNI)
);

-- Tabla REGISTROS
CREATE TABLE REGISTROS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    TIPO_DOC VARCHAR(10) NOT NULL,
    DNI VARCHAR(8) NOT NULL,
    AP_PATERNO VARCHAR(100) NOT NULL,
    AP_MATERNO VARCHAR(100) NOT NULL,
    NOMBRES VARCHAR(100) NOT NULL,
    CELULAR VARCHAR(20) NOT NULL,
    CORREO VARCHAR(100) NOT NULL,
    PASSWORD VARCHAR(200) NOT NULL,
    FECHA_REGISTRO DATETIME NOT NULL,
    UNIQUE (TIPO_DOC, DNI, AP_PATERNO, AP_MATERNO, NOMBRES)
    
);


-- Tabla UBICACIONES
CREATE TABLE UBICACIONES (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    COD_UBIGEO VARCHAR(20) NOT NULL,
    DEPARTAMENTO VARCHAR(200) NOT NULL,
    PROVINCIA VARCHAR(200) NOT NULL,
    DISTRITO VARCHAR(200) NOT NULL,
    UNIQUE (COD_UBIGEO, DEPARTAMENTO, PROVINCIA, DISTRITO)
);


-- Tabla CARRERAS
CREATE TABLE CARRERAS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    FACULTAD VARCHAR(200) NOT NULL,
    ESCUELA_COMPLETA VARCHAR(200) NOT NULL,
    ESCUELA VARCHAR(200) NOT NULL,
    CODIGO_ESCUELA VARCHAR(8) NOT NULL,
    AREA VARCHAR(8) NOT NULL,
    SEDE_FACULTAD VARCHAR(200) NOT NULL,
    UNIQUE (FACULTAD, ESCUELA_COMPLETA, ESCUELA, CODIGO_ESCUELA, AREA),
    INDEX (CODIGO_ESCUELA),
    INDEX (AREA)
);


-- Tabla INSCRITOS
CREATE TABLE INSCRITOS (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    DNI VARCHAR(8) UNIQUE NOT NULL,
    COD_CARRERA VARCHAR(8) NOT NULL,
    AREA_CARRERA VARCHAR(8) NOT NULL,
    PROCESO INT NOT NULL,
    MODALIDAD INT NOT NULL,
    SEDE_EXAM VARCHAR(80) NOT NULL,
    PAGO_1 INT NOT NULL,
    PAGO_2 VARCHAR(20) NOT NULL,
    PREPARATORIA BOOLEAN NOT NULL,
    YEAR_CONCLU VARCHAR(4) NOT NULL,
    FECHA_REGISTRO DATETIME NOT NULL,
    CONSTRAINT FK_CARRERAS_INSCRITOS_COD_CA FOREIGN KEY (COD_CARRERA) REFERENCES CARRERAS(CODIGO_ESCUELA),
    CONSTRAINT FK_CARRERAS_INSCRITOS_AREA_CA FOREIGN KEY (AREA_CARRERA) REFERENCES CARRERAS(AREA),
    CONSTRAINT FK_PROCESOS_INSCRITOS_PROCE_CA FOREIGN KEY (PROCESO) REFERENCES PROCESOS(ID),
    CONSTRAINT FK_PROCESOS_INSCRITOS_MODA_CA FOREIGN KEY (MODALIDAD) REFERENCES PROCESOS(ID),
    CONSTRAINT FK_PAGOS_INSCRITOS FOREIGN KEY (PAGO_1) REFERENCES PAGOS(ID),
    UNIQUE (COD_CARRERA, AREA_CARRERA, PROCESO, MODALIDAD, PAGO_1)
);



-- Tabla VACANTES
CREATE TABLE VACANTES (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    ID_PROCESO INT NOT NULL,
    ID_CARRERA INT NOT NULL,
    AREA VARCHAR(2) NOT NULL,
    CANTIDAD VARCHAR(4) NOT NULL,
    USUARIO_REGISTRO INT NOT NULL,
    CONSTRAINT FK_PROCESOS_VACANTES FOREIGN KEY (ID_PROCESO) REFERENCES PROCESOS(ID),
    CONSTRAINT FK_CARRERAS_VACANTES_ID_CA_VACA FOREIGN KEY (ID_CARRERA) REFERENCES CARRERAS(ID),
    CONSTRAINT FK_CARRERAS_VACANTES_ID_AREA_VA FOREIGN KEY (AREA) REFERENCES CARRERAS(AREA),
    CONSTRAINT FK_USUARIOS_VACANTES FOREIGN KEY (USUARIO_REGISTRO) REFERENCES USUARIOS(ID),
    UNIQUE (ID_PROCESO, ID_CARRERA, AREA)
);

-- INSERT DE ROLES
INSERT INTO ROLES (NOMBRE) VALUES ('ADMIN'), ('USER');

-- INSERT DE CARRERAS
INSERT INTO RUTAS (NOMBRE, RUTA) VALUES ('PRINCIPAL', '/');

-- INSERT USUARIO
INSERT INTO usuarios (NOMBRES, USUARIO, DNI, PASSWORD, ROL, FECHA_REGISTRO)
VALUES ("ADMIN", "ADMIN", "99999999", "ADMIN", 1, NOW());

-- INSERT DE CARRERAS
INSERT INTO CARRERAS (FACULTAD, ESCUELA_COMPLETA, ESCUELA, CODIGO_ESCUELA, AREA, SEDE_FACULTAD)
VALUES 
('CIENCIAS AGROPECUARIAS', 'AGRONOMÍA (LA MERCED)', 'AGRONOMÍA', '1', '127001', 'LA MERCED'),
('CIENCIAS AGROPECUARIAS', 'AGRONOMÍA (OXAPAMPA)', 'AGRONOMÍA', '2', '128001', 'OXAPAMPA'),
('CIENCIAS AGROPECUARIAS', 'AGRONOMÍA (PASCO)', 'AGRONOMÍA', '3', '124001', 'PASCO'),
('CIENCIAS AGROPECUARIAS', 'AGRONOMÍA (PAUCARTAMBO)', 'AGRONOMÍA', '4', '126001', 'PAUCARTAMBO'),
('CIENCIAS AGROPECUARIAS', 'AGRONOMÍA (YANAHUANCA)', 'AGRONOMÍA', '5', '125001', 'YANAHUANCA'),
('CIENCIAS AGROPECUARIAS', 'INDUSTRIAS ALIMENTARIAS (LA MERCED)', 'INDUSTRIAS ALIMENTARIAS', '6', '131001', 'LA MERCED'),
('CIENCIAS AGROPECUARIAS', 'ZOOTECNIA (OXAPAMPA)', 'ZOOTECNIA', '7', '130001', 'OXAPAMPA'),
('CIENCIAS AGROPECUARIAS', 'ZOOTECNIA (PASCO)', 'ZOOTECNIA', '8', '129001', 'PASCO'),
('CIENCIAS DE LA COMUNICACIÓN', 'CIENCIAS DE LA COMUNICACIÓN (LA MERCED)', 'CIENCIAS DE LA COMUNICACIÓN', '9', '137001', 'LA MERCED'),
('CIENCIAS DE LA COMUNICACIÓN', 'CIENCIAS DE LA COMUNICACIÓN (PASCO)', 'CIENCIAS DE LA COMUNICACIÓN', '10', '136001', 'PASCO'),
('CIENCIAS DE LA EDUCACIÓN', 'BIOLOGÍA Y QUÍMICA (PASCO)', 'EDUCACIÓN SECUNDARIA', '11', '107001', 'PASCO'),
('CIENCIAS DE LA EDUCACIÓN', 'CIENCIAS SOCIALES, FILOSOFÍA Y PSICOLOGÍA EDUCATIVA (PASCO)', 'EDUCACIÓN SECUNDARIA', '13', '108001', 'PASCO'),
('CIENCIAS DE LA EDUCACIÓN', 'COMUNICACIÓN Y LITERATURA (PASCO)', 'EDUCACIÓN SECUNDARIA', '15', '104001', 'PASCO'),
('CIENCIAS DE LA EDUCACIÓN', 'EDUCACIÓN INICIAL (PASCO)', 'EDUCACIÓN INICIAL', '16', '100001', 'PASCO'),
('CIENCIAS DE LA EDUCACIÓN', 'EDUCACIÓN PRIMARIA (OXAPAMPA)', 'EDUCACIÓN PRIMARIA', '18', '103001', 'OXAPAMPA'),
('CIENCIAS DE LA EDUCACIÓN', 'EDUCACIÓN PRIMARIA (PASCO)', 'EDUCACIÓN PRIMARIA', '19', '101001', 'PASCO'),
('CIENCIAS DE LA EDUCACIÓN', 'EDUCACIÓN PRIMARIA (YANAHUANCA)', 'EDUCACIÓN PRIMARIA', '21', '102001', 'YANAHUANCA'),
('CIENCIAS DE LA EDUCACIÓN', 'HISTORIA, CIENCIAS SOCIALES Y TURISMO (PASCO)', 'EDUCACIÓN SECUNDARIA', '22', '105001', 'PASCO'),
('CIENCIAS DE LA EDUCACIÓN', 'LENGUAS EXTRANJERAS INGLÉS - FRANCÉS (PASCO)', 'EDUCACIÓN SECUNDARIA', '24', '109001', 'PASCO'),
('CIENCIAS DE LA EDUCACIÓN', 'MATEMATICA - FÍSICA (PASCO)', 'EDUCACIÓN SECUNDARIA', '25', '106001', 'PASCO'),
('CIENCIAS DE LA EDUCACIÓN', 'TECNOLOGÍA, INFORMÁTICA Y TELECOMUNICACIONES (PASCO)', 'EDUCACIÓN SECUNDARIA', '26', '110001', 'PASCO'),
('CIENCIAS DE LA EDUCACIÓN', 'TECNOLOGÍA, INFORMÁTICA Y TELECOMUNICACIONES (YANAHUANCA)', 'EDUCACIÓN SECUNDARIA', '27', '111001', 'YANAHUANCA'),
('CIENCIAS ECONÓMICAS Y CONTABLES', 'CONTABILIDAD (PASCO)', 'CONTABILIDAD', '28', '123001', 'PASCO'),
('CIENCIAS ECONÓMICAS Y CONTABLES', 'ECONOMÍA (PASCO)', 'ECONOMÍA', '30', '122001', 'PASCO'),
('CIENCIAS EMPRESARIALES', 'ADMINISTRACIÓN (PASCO)', 'ADMINISTRACIÓN', '31', '135001', 'PASCO'),
('DERECHO Y CIENCIAS POLÍTICAS', 'DERECHO (PASCO)', 'DERECHO', '32', '138001', 'PASCO'),
('INGENIERÍA', 'INGENIERÍA AMBIENTAL (OXAPAMPA)', 'INGENIERÍA AMBIENTAL', '33', '116001', 'OXAPAMPA'),
('INGENIERÍA', 'INGENIERÍA AMBIENTAL (PASCO)', 'INGENIERÍA AMBIENTAL', '34', '115001', 'PASCO'),
('INGENIERÍA', 'INGENIERÍA CIVIL (PASCO)', 'INGENIERÍA CIVIL', '35', '117001', 'PASCO'),
('INGENIERÍA', 'INGENIERÍA DE SISTEMAS Y COMPUTACIÓN (PASCO)', 'INGENIERÍA DE SISTEMAS Y COMPUTACIÓN', '36', '114001', 'PASCO'),
('INGENIERÍA', 'INGENIERÍA GEOLÓGICA (PASCO)', 'INGENIERÍA GEOLÓGICA', '37', '113001', 'PASCO'),
('INGENIERÍA', 'INGENIERÍA METALÚRGICA (PASCO)', 'METALÚRGICA', '38', '112001', 'PASCO'),
('INGENIERÍA DE MINAS', 'INGENIERÍA DE MINAS (PASCO)', 'INGENIERÍA DE MINAS', '39', '134001', 'PASCO'),
('MEDICINA HUMANA', 'MEDICINA HUMANA (PASCO)', 'MEDICINA HUMANA', '40', '133001', 'PASCO'),
('ODONTOLOGÍA', 'ODONTOLOGÍA (PASCO)', 'ODONTOLOGÍA', '41', '132001', 'PASCO'),
('CIENCIAS DE LA SALUD', 'ENFERMERÍA (PASCO)', 'ENFERMERÍA', '42', '118001', 'PASCO'),
('CIENCIAS DE LA SALUD', 'ENFERMERÍA (TARMA)', 'ENFERMERÍA', '43', '120001', 'TARMA'),
('CIENCIAS DE LA SALUD', 'OBSTETRICIA (PASCO)', 'OBSTETRICIA', '44', '119001', 'PASCO');

-- INSERT procesos
INSERT INTO
procesos
(NOMBRE, ESTADO, FECHA_REGISTRO, USUARIO_REGISTRO)
VALUES
("CEPRE I - 2021",0, STR_TO_DATE("20/03/2021", '%d/%m/%Y'), 1),
("EXTRAORDINARIO DE MODALIDADES 2021", 0, STR_TO_DATE("01/05/2021", '%d/%m/%Y'), 1),
("PRIMERA SELECCION 2021",	0,STR_TO_DATE("08/04/2021", '%d/%m/%Y'), 1),
("ORDINARIO I - 2021",	0, STR_TO_DATE("22/05/2021", '%d/%m/%Y'), 1),
("CEPRE I - 2022",	0, STR_TO_DATE("07/08/2021", '%d/%m/%Y'), 1),
("ORDINARIO I - 2022",	0, STR_TO_DATE("28/08/2021", '%d/%m/%Y'), 1),
("CEPRE II - 2022",	0, STR_TO_DATE("21/09/2022", '%d/%m/%Y'), 1),
("PRIMERA SELECCION 2022", 0, STR_TO_DATE("04/12/2021", '%d/%m/%Y'), 1),
("CEPRE III - 2022", 0, STR_TO_DATE("17/01/2022", '%d/%m/%Y'), 1),
("EXTRAORDINARIO DE MODALIDADES 2022",	0, STR_TO_DATE("12/03/2022", '%d/%m/%Y'), 1),
("ORDINARIO II - 2022",	0,STR_TO_DATE("16/04/2022", '%d/%m/%Y'), 1),
("CEPRE I - 2023",	0,STR_TO_DATE("23/05/2022", '%d/%m/%Y'), 1),
("ORDINARIO I - 2023",	0,STR_TO_DATE("11/08/2022", '%d/%m/%Y'), 1),
("CEPRE II - 2023",	0, STR_TO_DATE("06/11/2022", '%d/%m/%Y'), 1),
("CEPRE III - 2023", 0, STR_TO_DATE("24/02/2023", '%d/%m/%Y'), 1),
("PRIMERA SELECCION 2023", 0, STR_TO_DATE("18/12/2022", '%d/%m/%Y'), 1),
("EXTRAORDINARIO DE MODALIDADES 2023",	0, STR_TO_DATE("26/02/2023", '%d/%m/%Y'), 1),
("ORDINARIO II - 2023",	0, STR_TO_DATE("05/02/2023", '%d/%m/%Y'), 1),
("CEPRE I - 2024",	0,STR_TO_DATE("12/04/2023", '%d/%m/%Y'), 1),
("ORDINARIO I - 2024",	0, STR_TO_DATE("06/08/2023", '%d/%m/%Y'), 1),
("CEPRE II - 2024",	0, STR_TO_DATE("07/08/2023", '%d/%m/%Y'), 1),
("PRIMERA SELECCION 2024",1, STR_TO_DATE("10/12/2023", '%d/%m/%Y'), 1);