CREATE TABLE public.carro (
id_carro serial,
placa varchar(8),
foto varchar(255),
capacidad int4,
PRIMARY KEY (id_carro)
);


CREATE TABLE public.usuario (
id serial,
nick varchar(15),
password varchar(20),
Nombre varchar(50),
Apellidos varchar(50),
sexo varchar(10),
telefonos varchar(10),
id_carro int4,
foto varchar(255),
PRIMARY KEY (id),
FOREIGN KEY (id_carro) REFERENCES public.carro (id_carro) ON DELETE SET DEFAULT ON UPDATE SET DEFAULT
);


CREATE TABLE public.Aventon (
id_aventon serial,
longitud float8,
latitud float8,
fecha date,
hora time(6),
id_usuario_pide int4,
id_usuario_da int4,
PRIMARY KEY (id_aventon),
FOREIGN KEY (id_usuario_pide) REFERENCES public.usuario (id) ON DELETE SET DEFAULT ON UPDATE SET DEFAULT,
FOREIGN KEY (id_usuario_da) REFERENCES public.usuario (id) ON DELETE SET DEFAULT ON UPDATE SET DEFAULT
);


CREATE TABLE public.Notificacion (
id_Notificacion serial,
tipo varchar(40),
estado varchar(40),
id_emisor int4,
id_receptor int4,
PRIMARY KEY (id_Notificacion),
FOREIGN KEY (id_receptor) REFERENCES public.usuario (id) ON DELETE SET DEFAULT ON UPDATE SET DEFAULT,
FOREIGN KEY (id_emisor) REFERENCES public.usuario (id) ON DELETE SET DEFAULT ON UPDATE SET DEFAULT
);



CREATE TABLE public.Ruta (
id_ruta serial,
fecha date NOT NULL,
costo money NOT NULL,
capacidad numeric(2) NOT NULL,
hora time(6) NOT NULL,
estado varchar(10) NOT NULL,
puntosx float[10],
puntosy float[10],
idcreador int4,
PRIMARY KEY (id_ruta),
FOREIGN KEY (idcreador) REFERENCES public.usuario (id) ON DELETE SET DEFAULT ON UPDATE SET DEFAULT
);


CREATE TABLE public.Usuario_Ruta (
id_usuario_ruta serial,
id_usuario int4,
id_ruta int4,
lat float8,
longit float8,
PRIMARY KEY (id_usuario_ruta),
FOREIGN KEY (id_ruta) REFERENCES public.Ruta (id_ruta) ON DELETE SET DEFAULT ON UPDATE SET DEFAULT,
FOREIGN KEY (id_usuario) REFERENCES public.usuario (id) ON DELETE SET DEFAULT ON UPDATE SET DEFAULT
);


CREATE TABLE public.Mensaje (
id_mensaje serial,
fecha date,
hora time(6),
contenido varchar(30),
id_Emisor int4,
id_Receptor int4,
PRIMARY KEY (id_mensaje),
FOREIGN KEY (id_Receptor) REFERENCES public.usuario (id) ON DELETE SET DEFAULT ON UPDATE SET DEFAULT,
FOREIGN KEY (id_Emisor) REFERENCES public.usuario (id) ON DELETE SET DEFAULT ON UPDATE SET DEFAULT
);


insert into public.usuario (nick, password, Nombre, Apellidos, sexo, telefonos, id_carro, foto) values('oswaldito' , 'eloy', 'Oswaldo', 'Bayona', 'masculino', '0989666933', null,'imagenes/oswaldito.png'  );

insert into public.usuario (nick, password, Nombre, Apellidos, sexo, telefonos, id_carro, foto) values('Mafia' , 'chumi', 'Mafia', 'Chumi', 'Femenino', '0987666936', null,'imagenes/mafia.png'  );

insert into public.Ruta(fecha, costo, capacidad, hora, estado, puntosx, puntosy, idcreador) values( '2015-08-06', 12, 1, '15:13', 'activo',
 '{-2.1689967, -2.1675825, -2.1674119}' , '{-79.9197839, -79.9210769, -79.9163315}',  2 ); 

insert into public.Ruta(fecha, costo, capacidad, hora, estado, puntosx, puntosy, idcreador) values( '2016-08-06', 12, 1, '15:13', 'activo',
 '{-2.1689967, -2.1675825, -2.1674119}' , '{-79.9197839, -79.9210769, -79.9163315}',  2 );

insert into public.Ruta(fecha, costo, capacidad, hora, estado, puntosx, puntosy, idcreador) values( '2016-07-06', 12, 1, '13:13', 'activo',
 '{-2.1689967, -2.1675825, -2.1674119}' , '{-79.9197839, -79.9210769, -79.9163315}',  2 );

