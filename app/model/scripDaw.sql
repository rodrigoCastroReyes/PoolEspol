CREATE TABLE "public"."carro"(
"id_carro" int4 NOT NULL,
"placa" varchar(8),
"foto" bytea,
"capacidad" int4,
PRIMARY KEY ("id_carro")
)

CREATE TABLE "public"."usuario"(
"id" int4 NOT NULL,
"nick" varchar(15),
"password" varchar(20),
"Nombre" varchar(50),
"Apellidos" varchar(50),
"sexo" varchar(10),
"telefonos" varchar(10),
"id_carro" int4,
"foto" bytea,
PRIMARY KEY ("id"),
FOREIGN KEY ("id_carro") REFERENCES "public"."carro" ("id_carro") ON DELETE SET DEFAULT ON UPDATE SET DEFAULT
)


CREATE TABLE "public"."Mensaje" (
"id_mensaje" int4 NOT NULL,
"fecha" date,
"hora" time(6),
"contenido" varchar(30),
"id_Emisor" int4,
"id_Receptor" int4,
PRIMARY KEY ("id_mensaje"),
FOREIGN KEY ("id_Receptor") REFERENCES "public"."usuario" ("id") ON DELETE SET DEFAULT ON UPDATE SET DEFAULT,
FOREIGN KEY ("id_Emisor") REFERENCES "public"."usuario" ("id") ON DELETE SET DEFAULT ON UPDATE SET DEFAULT
)

CREATE TABLE "public"."Aventon"(
"id_aventon" int4 NOT NULL,
"longitud" float8,
"latitud" float8,
"fecha" date,
"hora" time(6),
"id_usuario_pide" int4,
"id_usuario_da" int4,
PRIMARY KEY ("id_aventon"),
FOREIGN KEY ("id_usuario_pide") REFERENCES "public"."usuario" ("id") ON DELETE SET DEFAULT ON UPDATE SET DEFAULT,
FOREIGN KEY ("id_usuario_da") REFERENCES "public"."usuario" ("id") ON DELETE SET DEFAULT ON UPDATE SET DEFAULT
)

CREATE TABLE "public"."Notificacion" (
"id_Notificacion" int4 NOT NULL,
"tipo" varchar(40),
"estado" varchar(40),
"id_emisor" int4,
"id_receptor" int4,
PRIMARY KEY ("id_Notificacion"),
FOREIGN KEY ("id_receptor") REFERENCES "public"."usuario" ("id") ON DELETE SET DEFAULT ON UPDATE SET DEFAULT,
FOREIGN KEY ("id_emisor") REFERENCES "public"."usuario" ("id") ON DELETE SET DEFAULT ON UPDATE SET DEFAULT
)

CREATE TABLE "public"."Ruta" (
"id_ruta" int4 NOT NULL,
"fecha" date NOT NULL,
"costo" money NOT NULL,
"capacidad" numeric(2) NOT NULL,
"hora" time(6) NOT NULL,
"estado" varchar(10) NOT NULL,
"puntos" point,
"idcreador" int4,
PRIMARY KEY ("id_ruta"),
FOREIGN KEY ("idcreador") REFERENCES "public"."usuario" ("id") ON DELETE SET DEFAULT ON UPDATE SET DEFAULT
)


CREATE TABLE "public"."Usuario_Ruta" (
"id_usuario_ruta" int4 NOT NULL,
"id_usuario" int4,
"id_ruta" int4,
"lat" float8,
"long" float8,
PRIMARY KEY ("id_usuario_ruta"),
FOREIGN KEY ("id_ruta") REFERENCES "public"."Ruta" ("id_ruta") ON DELETE SET DEFAULT ON UPDATE SET DEFAULT,
FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario" ("id") ON DELETE SET DEFAULT ON UPDATE SET DEFAULT
)