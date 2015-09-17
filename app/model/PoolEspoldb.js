var Sequelize = require('sequelize');

var sequelize = new Sequelize("2015_1T_grupo4","grupo4","grupo4",{
	host: '200.10.150.66',
	dialect: 'postgres',
	define:{
		timestamps: false
	},
	pool:{
		max: 5,
		min: 0,
		idle: 10000
	}
});

sequelize.authenticate();

var  Aventon = sequelize.define('aventon',{
	id_aventon:{
		primaryKey:true,
		type:Sequelize.INTEGER,
		autoIncrement: true,
		//field hago referencia al nombre de la columna de la tabla aventon
		field: 'id_aventon'
	},
	longitud:{
		type: Sequelize.DOUBLE,
		field: 'longitud',
		get: function(){
			return this.getDataValue('longitud');
		},
		set: function(valor){
			this.setDataValue('longitud',valor);
		}
	},
	latitud:{
		type: Sequelize.DOUBLE,
		field: 'latitud',
		get: function(){
			return this.getDataValue('latitud');
		},
		set: function(valor){
			this.setDataValue('latitud',valor);
		}
	},
	fecha:{
		type: Sequelize.DATE,
		field: 'fecha',
		get: function(){
			return this.getDataValue('fecha');
		},
		set: function(valor){
			this.setDataValue('fecha',valor);
		}
	},
	hora:{
		type: Sequelize.TIME,
		field: 'hora',
		get: function(){
			return this.getDataValue('hora');
		},
		set: function(valor){
			this.setDataValue('hora',valor);
		}
	}
},{
	//el nombre del modelo de la tabla hace referencia al nombre de la tabla de la base de datos
	freezeTableName: true,
	tableName: 'aventon'
});


var Mensaje = sequelize.define('mensaje',{
	id_mensaje:{
		primaryKey:true,
		type:Sequelize.INTEGER,
		autoIncrement: true,
		field: 'id_mensaje'
	},
	fecha:{
		type:Sequelize.DATE,
		field: 'fecha',
		get: function(){
			return this.getDataValue('fecha');
		},
		set: function(valor){
			this.setDataValue('fecha',valor);
		}
	},
	hora:{
		type: Sequelize.TIME,
		field: 'hora',
		get: function(){
			return this.getDataValue('hora');
		},
		set: function(valor){
			this.setDataValue('hora',valor);
		}
	},
	leido:{
		type: Sequelize.BOOLEAN,
		field: 'leido',
		get: function(){
			return this.getDataValue('leido');
		},
		set: function(valor){
			this.setDataValue('leido',valor);
		}
	},
	
	contenido:{
		type: Sequelize.TEXT,
		field: 'contenido',
		get: function(){
			return this.getDataValue('contenido');
		},
		set: function(valor){
			this.setDataValue('contenido',valor);
		}
	}
},{
	freezeTableName: true,
	tableName: 'mensaje'
});

var Notificacion = sequelize.define('notificacion',{
	id_Notificacion:{
		primaryKey:true,
		type:Sequelize.INTEGER,
		autoIncrement: true,
		field: 'id_notificacion'
	},
	tipo:{
		type: Sequelize.STRING,
		field: 'tipo',
		get: function(){
			return this.getDataValue('tipo');
		},
		set: function(valor){
			this.setDataValue('tipo',valor);
		}
	},
	estado:{
		type: Sequelize.STRING,
		field: 'estado',
		get: function(){
			return this.getDataValue('estado');
		},
		set: function(valor){
			this.setDataValue('estado',valor);
		}
	}

},{
	freezeTableName: true,
	tableName: 'notificacion'
});



var Ruta = sequelize.define('ruta',{
	id_ruta:{
		primaryKey:true,
		type:Sequelize.INTEGER,
		autoIncrement: true,
		field: 'id_ruta'
	},
	fecha:{
		type:Sequelize.DATE,
		field: 'fecha',
		allowNull: false,
		get: function(){
			return this.getDataValue('fecha');
		},
		set: function(valor){
			this.setDataValue('fecha',valor);
		}
	},
	costo:{
		type:Sequelize.FLOAT,
		field: 'costo',
		get: function(){
			return this.getDataValue('costo');
		},
		set: function(valor){
			this.setDataValue('costo',valor);
		}
	},
	capacidad:{
		type: Sequelize.INTEGER,
		field: 'capacidad',
		allowNull: false,
		get: function(){
			return this.getDataValue('capacidad');
		},
		set: function(valor){
			this.setDataValue('capacidad',valor);
		}
	},
	hora:{
		type: Sequelize.TIME,
		allowNull: false,
		field: 'hora',
		get: function(){
			return this.getDataValue('hora');
		},
		set: function(valor){
			this.setDataValue('hora',valor);
		}
	},
	estado:{
		type: Sequelize.STRING,
		allowNull: false,
		field: 'estado',
		get: function(){
			return this.getDataValue('estado');
		},
		set: function(valor){
			this.setDataValue('estado',valor);
		}
	},
	puntosx:{
		type: Sequelize.ARRAY(Sequelize.DOUBLE),
		allowNull: true,
		field: 'puntosx',
		get: function(){
			return this.getDataValue('puntosx');
		},
		set: function(valor){
			this.setDataValue('puntosx',valor);
		}
	},
	puntosy:{
		type: Sequelize.ARRAY(Sequelize.DOUBLE),
		allowNull: true,
		field: 'puntosy',
		get: function(){
			return this.getDataValue('puntosy');
		},
		set: function(valor){
			this.setDataValue('puntosy',valor);
		}
	}

},{
	freezeTableName: true,
	tableName: 'ruta'
});


var Usuario_Ruta = sequelize.define('usuario_ruta',{
	id_usuario_ruta:{
		primaryKey:true,
		type:Sequelize.INTEGER,
		autoIncrement: true,
		field: 'id_usuario_ruta'
	},
	lat:{
		type: Sequelize.DOUBLE,
		field: 'lat',
		get: function(){
			return this.getDataValue('lat');
		},
		set: function(valor){
			this.setDataValue('lat',valor);
		}
	},
	estado:{
		type: Sequelize.STRING,
		field: 'estado',
		get: function(){
			return this.getDataValue('estado');
		},
		set: function(valor){
			this.setDataValue('estado',valor);
		}
	},
	longit:{
		type: Sequelize.DOUBLE,
		field: 'longit',
		get: function(){
			return this.getDataValue('longit');
		},
		set: function(valor){
			this.setDataValue('longit',valor);
		}
	}

},{
	freezeTableName: true,
	tableName: 'usuario_ruta'
});


var Carro = sequelize.define('carro',{
	id_carro:{
		primaryKey:true,
		type:Sequelize.INTEGER,
		field: 'id_carro',
		autoIncrement: true
	
	},
	placa:{
		type: Sequelize.STRING,
		field: 'placa',
		get: function(){
			return this.getDataValue('placa');
		},
		set: function(valor){
			this.setDataValue('placa',valor);
		}
	},
	foto:{
		type: Sequelize.STRING,
		field: 'foto',
		get: function(){
			return this.getDataValue('foto');
		},
		set: function(valor){
			this.setDataValue('foto',valor);
		}
	},
	capacidad:{
		type: Sequelize.INTEGER,
		field: 'capacidad',
		allowNull: false,
		get: function(){
			return this.getDataValue('capacidad');
		},
		set: function(valor){
			this.setDataValue('capacidad',valor);
		}
	}
},{
	freezeTableName: true,
	tableName: 'carro'
});

var Usuario = sequelize.define('usuario',{
	id:{
		primaryKey:true,
		type:Sequelize.INTEGER,
		autoIncrement: true,
		field: 'id'
	},
	nick:{
		type: Sequelize.STRING,
		allowNull:false,
		field: 'nick',
		get: function(){
			return this.getDataValue('nick');
		},
		set: function(valor){
			this.setDataValue('nick',valor);
		}

	},
	password:{
		type: Sequelize.STRING,
		allowNull: false,
		field: 'password',
		get: function(){
			return this.getDataValue('password');
		},
		set: function(valor){
			this.setDataValue('password',valor);
		}
	},
	nombre:{
		type: Sequelize.TEXT,
		allowNull: false,
		field: 'nombre',
		get: function(){
			return this.getDataValue('nombre');
		},
		set: function(valor){
			this.setDataValue('nombre',valor);
		}
	},
	apellidos:{
		type: Sequelize.TEXT,
		allowNull: false,
		field: 'apellidos',
		get: function(){
			return this.getDataValue('apellidos');
		},
		set: function(valor){
			this.setDataValue('apellidos',valor);
		}
	},
	sexo:{
		type: Sequelize.STRING,
		allowNull: false,
		field: 'sexo',
		get: function(){
			return this.getDataValue('sexo');
		},
		set: function(valor){
			this.setDataValue('sexo',valor);
		}
	},
	telefono:{
		type: Sequelize.TEXT,
		allowNull: false,
		field: 'telefonos',
		get: function(){
			return this.getDataValue('telefono');
		},
		set: function(valor){
			this.setDataValue('telefono',valor);
		}
	},
	foto:{
		type: Sequelize.STRING,
		allowNull: false,
		field: 'foto',
		get: function(){
			return this.getDataValue('foto');
		},
		set: function(valor){
			this.setDataValue('foto',valor);
		}
	}
},{
	freezeTableName: true,
	tableName: 'usuario'
});


Usuario.belongsTo(Carro,{
	foreignKey: 'id_carro',
	as: 'Usuario_Carro'
});

Notificacion.belongsTo(Usuario_Ruta,{
	foreignKey: 'usuarioruta',
	as: 'Notificacion_Usuario_Ruta'
});

Notificacion.belongsTo(Usuario,{
	foreignKey: 'id_emisor',
	as: 'Emisor_Notifica'
});

Notificacion.belongsTo(Usuario,{
	foreignKey: 'id_receptor',
	as: 'Receptor_Notificado'
});

Usuario.hasMany(Mensaje,{
	foreignKey: 'id_emisor',
	as: 'Emisor_Mensaje'
});

Usuario.hasMany(Mensaje,{
	foreignKey: 'id_receptor',
	as: 'Receptor_Mensaje'
});

Usuario.hasMany(Aventon,{
	foreignKey: 'id_usuario_da',
	as: 'Usuario_Da_Aventon'
});

Usuario.hasMany(Aventon,{
	foreignKey: 'id_usuario_pide',
	as: 'Usuario_Pide_Aventon'
});

Aventon.belongsTo(Usuario, {
	foreignKey: 'id_usuario_pide',
	as: 'publicador'
});

Usuario.hasMany(Ruta,{
	foreignKey: 'idcreador',
	as: 'Usuario_tiene_Rutas'
});

Ruta.belongsTo(Usuario, {
	foreignKey: 'idcreador'
});

Ruta.hasMany(Usuario_Ruta,{
	foreignKey: 'id_ruta',
	as: 'Ruta_tiene_Usuarios'
});

Usuario_Ruta.belongsTo(Ruta, {
	foreignKey: 'id_ruta',
	as: 'Ruta_Miembro'
});

Usuario.hasMany(Usuario_Ruta,{
	foreignKey: 'id_usuario',
	as: 'Usuario_anade_usuariosRutas'
});

Usuario_Ruta.belongsTo(Usuario, {
	foreignKey: 'id_usuario',
	as : 'Usuario_Miembro'
});

Usuario_Ruta.belongsTo(Usuario,{
	foreignKey: 'id_usuario',
	as: 'pasajeros'
});

module.exports.Mensaje = Mensaje;
module.exports.Notificacion = Notificacion;
module.exports.Ruta = Ruta;
module.exports.Usuario_Ruta = Usuario_Ruta;
module.exports.Carro = Carro;
module.exports.Usuario = Usuario;
module.exports.Aventon = Aventon;
