const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const socketio = require('socket.io');
/*
* @ Config BBDD
*/
require('./config/db');

/***/


const app = express();
const PORT = process.env.PORT || 3000;

/*
* @ Routes
*/
const testRoutes = require('./routes/test');
const registerRoutes = require('./routes/app_mobil/register');
const loginRoutes = require('./routes/app_mobil/login');
const chatRoutes = require('./routes/app_mobil/chat');

/*
* @ Routes web
*/
const webRouters = require('./routes/app_web/index');

/***/
const chatUtils = require('./realtime/chat/index');


app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	// res.header("Access-Control-Allow-Credentials", true);
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
app.use(bodyParser.urlencoded({exrended: true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(testRoutes);
app.use(registerRoutes);
app.use(loginRoutes);
app.use(chatRoutes);

app.use(webRouters);

let server = app.listen(PORT, () => {
	console.log('Servidor conectado ' + PORT);
});

let io = socketio(server);
let sockets = {};

io.on('connection', (socket) => {

	let userId = socket.request._query.userId;
	if(userId) sockets[userId] = socket;
	
	console.log('User Connected => ' + userId + ' Socket ID => ' + socket.id);

	socket.on('new-message', function(msg){
		chatUtils.saveMessage(msg);
		let userSocket = sockets[msg.toId];
		if(!userSocket) return;
		userSocket.emit('add-message', msg);
	});

	socket.on('write-message', function(data){
		let userSocket = sockets[data.toId];
		if(!userSocket) return;

		userSocket.emit('typing-message');
	});
	
	socket.on('disconnect', function(){		
		Object.keys(sockets).forEach((userId) => {
			let s = sockets[userId];
			if(s && s.id == socket.id){
				sockets[userId] = null;
				console.log('User Disconnected => '+ s.id);
			}
		});
	});
});



// const client = require('./realtime/client');