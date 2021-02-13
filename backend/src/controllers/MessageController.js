const { uuid } = require('uuidv4');

let messages = [
	{
		id: uuid(),
		message: 'Bem vindo ao servidor Multichat',
		author: 'multichat',
		timestamp: new Date(),
	},
];

module.exports = {
	async index(req, res) {
		return res.json(messages);
	},

	async store(req, res) {
		const newMessage = {
			id: uuid(),
			...req.body,
			timestamp: new Date(),
		};

		messages.push(newMessage);

		// req.io.sockets.in('multichat').emit('sent-message', newMessage);

		req.io.sockets.in('multichat').emit('received-message', messages);

		return res.json(newMessage);

		console.log(error);
	},
};
