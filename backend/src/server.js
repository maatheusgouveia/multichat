const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
	socket.on('connect-room', room => {
		const roomName = room === null ? 'multichat' : room;

		socket.join(roomName);

		socket
			.in(roomName)
			.emit('user-connected', { message: 'Um usuário entrou na sala' });

		socket.on('disconnect', () => {
			socket.to(roomName).broadcast.emit('user-disconnected', {
				message: 'Um usuário saiu da sala',
			});
		});
	});

	console.log(`Socket conectado: ${socket.id}`);
});

app.use((req, res, next) => {
	req.io = io;

	return next();
});

app.use(express.json());

app.use(routes);

server.listen(3333, () => console.log('Servidor online 🚀🚀'));
