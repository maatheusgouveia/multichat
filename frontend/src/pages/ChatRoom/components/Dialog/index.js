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
import { toast } from 'react-toastify';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import api from '../../../../services/api';

export default function AuthDialog({ setCurrentUser }) {
	const [open, setOpen] = useState(false);
	const [user, setUser] = useState(() =>
		JSON.parse(localStorage.getItem('@multichat/current-user'))
	);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	async function handleConfirm() {
		try {
			const response = await api.post('users', user);

			setCurrentUser(response.data);
			setUser({});

			localStorage.setItem(
				'@multichat/current-user',
				JSON.stringify(response.data)
			);

			handleClose();
		} catch (error) {
			if (error.response?.data?.error) {
				toast.error(error.response.data.error);
			}
		}
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
				<DialogTitle id="form-dialog-title">
					Identifique-se para poder interagir
				</DialogTitle>

				<DialogContent>
					<TextField
						className="field"
						autoFocus
						fullWidth
						disabled
						id="username"
						label="Nome de usuário"
						onChange={e =>
							setUser({ ...user, [e.target.id]: e.target.value })
						}
						value={user.username}
					/>

					<TextField
						className="field"
						autoFocus
						fullWidth
						id="email"
						type="email"
						label="Email"
						onChange={e =>
							setUser({ ...user, [e.target.id]: e.target.value })
						}
						value={user.email || ''}
					/>

					<MuiPickersUtilsProvider
						className="field"
						utils={DateFnsUtils}
						locale={ptBr}
					>
						<DatePicker
							autoOk
							variant="inline"
							clearable
							disableFuture
							format="dd/MM/yyyy"
							InputAdornmentProps={{ position: 'start' }}
							onChange={date =>
								setUser({
									...user,
									birth_date: date,
								})
							}
							required
							fullWidth
							label="Data de nascimento"
							id="birth_date"
							value={user.birth_date || null}
							invalidDateMessage="Data inválida"
						/>
					</MuiPickersUtilsProvider>
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
