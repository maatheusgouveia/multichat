const { uuid } = require('uuidv4');

const welcomeMessage = {
	id: uuid(),
	message: 'Bem vindo ao servidor Multichat',
	author: 'multichat',
	timestamp: new Date(),
};

let messages = new Map();

class MessageController {
	async index(req, res) {
		const { room = 'multichat' } = req.query;
		let current = messages.get(room);

		if (!current) {
			messages.set(room, [welcomeMessage]);
		}

		return res.json(messages.get(room));
	}

	async store(req, res) {
		const { room = 'multichat' } = req.body;
		let current = messages.get(room);

		const newMessage = {
			id: uuid(),
			...req.body,
			timestamp: new Date(),
		};

		const newMessages = [...current, newMessage];

		messages.set(room, newMessages);

		current = newMessages;

		req.io.sockets.in(room).emit('received-message', current);

		return res.json(newMessage);
	}
}

module.exports = new MessageController();
