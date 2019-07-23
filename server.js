const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const socketio = require('socket.io');
const http = require('http');
/*
* @ Config BBDD
*/
require('./config/db');

/***/


const app = express();
const server = http.createServer(app);
const io = socketio(server);
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


io.on('connection', (socket) => {
	// console.log('Hola socket');
	// socket.on('disconnect', () => {
	// });	

	// socket.on('home', (socket) => {
	// 	console.log('Hola mundo');
	// 	console.log(socket);
	// });

	socket.on('message', function(msg){
	console.log(msg);
	// socket.emit('message', msg);
	
	});
	
	socket.on('add-message', (message) => {
	
	io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});
	
	});
	
	socket.on('disconnect', function(){
	
	io.emit('users-changed', {user: socket.nickname, event: 'left'});
	
	console.log('User Disconnected');
	
	});
});

server.listen(PORT, () => {
	console.log('Servidor conectado ' + PORT);
});



const client = require('./realtime/client');