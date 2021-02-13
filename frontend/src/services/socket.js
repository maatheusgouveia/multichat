import client from 'socket.io-client';

const socket = async () => {
	return client('http://localhost:3333');
};

export default socket;
