import React, { useState } from 'react';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function Welcome() {
	const history = useHistory();
	const [username, setUsername] = useState('');

	function handleSignIn() {
		const user = { username };

		localStorage.setItem('@multichat/current-user', JSON.stringify(user));

		history.push('/');
	}

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<Paper
				style={{
					width: 400,
					height: 280,
					padding: 25,
				}}
			>
				<Typography component="h1" variant="h5" align="center">
					Bem vindo!
				</Typography>

				<TextField
					style={{ marginTop: 50, marginBottom: 30 }}
					required
					fullWidth
					autoFocus
					placeholder="Digite seu nome de usuário"
					onChange={e => setUsername(e.target.value)}
				/>

				<Button
					fullWidth
					variant="contained"
					color="primary"
					onClick={handleSignIn}
				>
					Entrar
				</Button>
			</Paper>
		</div>
	);
}
