import React, { useState } from 'react';
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
} from '@material-ui/core';
import { FiLogIn } from 'react-icons/fi';

export default function AuthDialog({ setCurrentUser }) {
	const [open, setOpen] = useState(false);
	const [username, setUsername] = useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	function handleConfirm() {
		localStorage.setItem('@multichat/current-user', username);
		setCurrentUser(username);
		handleClose();
	}

	return (
		<div>
			<IconButton onClick={handleClickOpen}>
				<FiLogIn />
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Identifique-se</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						fullWidth
						id="username"
						label="Nome de usuário"
						onChange={e => setUsername(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancelar
					</Button>
					<Button onClick={handleConfirm} color="primary">
						Confirmar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
