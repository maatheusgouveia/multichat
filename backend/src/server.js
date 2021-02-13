const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
	socket.on('connectRoom', room => {
		socket.join(room);
	});

	console.log(`Socket conectado: ${socket.id}`);
});

app.use((req, res, next) => {
	req.io = io;

	return next();
});

app.use(express.json());

app.use(routes);

server.listen(3333);
