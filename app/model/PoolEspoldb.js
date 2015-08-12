var Sequelize = require('sequelize');
var sequelize = new Sequelize('PoolEspol','postgres','root',{
	dialect: "postgres",
	define:{
		timestamps: false,
		freezeTableName: true
	}
});

sequelize.authenticate().success(function(){
	console.log("OK");	
});

var  Aventon = sequelize.define('Aventon',{
	id_aventon:{
		primaryKey:true,
		type:Sequelize.INTEGER
	},
	longitud:Sequelize.DOUBLE,
	latitud:Sequelize.DOUBLE,
	fecha:Sequelize.DATE,
	hora:Sequelize.TIME
},{
	tableName: "aventon"
});

var Mensaje = sequelize.define('Mensaje',{
	id_mensaje:{
		primaryKey:true,
		type:Sequelize.INTEGER
	},
	fecha:Sequelize.DATE,
	hora:Sequelize.TIME,
	contenido:Sequelize.TEXT
},{
	tableName: "mensaje"
});

var Notificacion = sequelize.define('Notificacion',{
	id_Notificacion:{
		primaryKey:true,
		type:Sequelize.INTEGER
	},
	tipo:Sequelize.TEXT,
	estado:Sequelize.TEXT

},{
	tableName: "notificacion"
});

var Ruta = sequelize.define('Ruta',{
	id_ruta:{
		primaryKey:true,
		type:Sequelize.INTEGER
	},
	fecha:Sequelize.DATE,
	costo:Sequelize.FLOAT,
	capacidad:Sequelize.INTEGER,
	hora:Sequelize.TIME,
	estado:Sequelize.TEXT,
	puntosx:ARRAY(Sequelize.FLOAT),
	puntosy:ARRAY(Sequelize.FLOAT)

},{
	tableName: "ruta"
});


var Usuario_Ruta = Sequelize.define('Usuario_Ruta',{
	id_usuario_ruta:{
		primaryKey:true,
		type:Sequelize.INTEGER
	},
	lat:Sequelize.DOUBLE,
	longit:Sequelize.DOUBLE

},{
	tableName: "usuario_ruta"
});

var Carro = Sequelize.define('Carro',{
	id_carro:{
		primaryKey:true,
		type:Sequelize.INTEGER
	},
	placa:Sequelize.TEXT,
	foto:Sequelize.TEXT,
	capacidad:Sequelize.INTEGER
},{
	tableName: "carro"
});

var Usuario = Sequelize.define('Usuario',{
	id:{
		primaryKey:true,
		type:Sequelize.INTEGER
	},
	nick:Sequelize.TEXT,
	password:Sequelize.TEXT,
	nombre:Sequelize.TEXT,
	apellidos:Sequelize.TEXT,
	sexo:Sequelize.TEXT,
	telefono:Sequelize.TEXT,
	foto:Sequelize.TEXT
},{
	tableName: "usuario"
});

//RELACIONES ENTRE LAS TABLAS////////

Usuario.hasOne(Carro,{
	foreignKey: "id_carro",
	as: "usuario"
});

Usuario.hasMany(Ruta,{
	foreignKey: "idcreador",
	as: "ruta"
});

Usuario.hasMany(Usuario_Ruta,{
	foreignKey: "id_usuario",
	as: "usuario_ruta"
});

Ruta.hasMany(Usuario_Ruta,{
	foreignKey: "id_ruta",
	as: "usuario_ruta"
});

Usuario.hasMany(Mensaje,{
	foreignKey: "id_emisor",
	as: "mensaje"
});

Usuario.hasMany(Mensaje,{
	foreignKey: "id_receptor",
	as: "mensaje"
});

Notificacion.hasOne(Usuario,{
	foreignKey: "id_emisor",
	as: "notificacion"
});

Notificacion.hasOne(Usuario,{
	foreignKey: "id_receptor",
	as: "notificacion"
});

Usuario.hasMany(Aventon,{
	foreignKey: "usuario_pide"
	as: "aventon"
});

Usuario.hasMany(Aventon,{
	foreignKey: "usuario_da"
	as: "aventon"
});
///////////--------------------------

exports.module.Aventon = Aventon;
exports.module.Mensaje = Mensaje;
exports.module.Notificacion = Notificacion;
exports.module.Ruta = Ruta;
exports.module.Usuario_Ruta = Usuario_Ruta;
exports.module.Carro = Carro;
exports.module.Usuario = Usuario;
