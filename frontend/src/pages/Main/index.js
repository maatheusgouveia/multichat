import React, { useState, useEffect, useCallback } from 'react';
import { Grid, TextareaAutosize, IconButton } from '@material-ui/core';
import { MdSend } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import AuthDialog from './components/Dialog';

import Message from '../../components/Message';
import api from '../../services/api';
import socket from '../../services/socket';

export default function App() {
	const { room } = useParams();

	const [messages, setMessages] = useState([]);
	const [content, setContent] = useState('');
	const [currentUser, setCurrentUser] = useState(() => {
		return localStorage.getItem('@multichat/current-user');
	});

	const setupSocket = useCallback(async () => {
		const io = await socket();

		io.emit('connect-room', room);

		// io.on('sent-message', data => {
		// 	console.log('sent');
		// 	setMessages([...messages, data]);

		// 	if (Notification.permission === 'granted') {
		// 		new Notification(data.message);
		// 	}
		// });

		io.on('received-message', data => {
			setMessages(data);

			const lastMessage = data[data.length - 1];

			if (lastMessage.author !== currentUser) {
				if (Notification.permission === 'granted') {
					new Notification(lastMessage.message);
				}
			}
		});

		io.on('user-connected', data => {
			toast.info(data.message);
		});

		io.on('user-disconnected', data => {
			toast.info(data.message);
		});

		const response = await api.get('messages', { params: { room } });

		setMessages(response.data);

		window.onbeforeunload = e => {
			e.preventDefault();
			e.returnValue = '';
			io.emit('disconnect', currentUser);
		};
	}, [room, currentUser]);

	useEffect(() => {
		setupSocket();
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();

		const newMessage = {
			message: content,
			author: currentUser,
			room,
		};

		const response = await api.post('messages', newMessage);

		setMessages([...messages, response.data]);

		setContent('');
	}

	return (
		<Grid
			id="app"
			container
			direction="column"
			justify="space-between"
			alignItems="center"
			style={{ paddingBottom: 180 }}
		>
			<Grid item style={{ width: '100%' }}>
				{messages.map(message => (
					<Message
						key={message.id}
						message={message}
						sent={message.author === currentUser}
						received={message.author !== currentUser}
					/>
				))}
			</Grid>

			<form onSubmit={handleSubmit}>
				<Grid
					id="footer"
					container
					justify="flex-end"
					alignItems="center"
				>
					<TextareaAutosize
						required
						onChange={e => setContent(e.target.value)}
						value={content}
						disabled={!currentUser}
					/>

					{currentUser && (
						<IconButton type="submit" disabled={!currentUser}>
							<MdSend />
						</IconButton>
					)}

					{!currentUser && (
						<AuthDialog setCurrentUser={setCurrentUser} />
					)}
				</Grid>
			</form>
		</Grid>
	);
}
