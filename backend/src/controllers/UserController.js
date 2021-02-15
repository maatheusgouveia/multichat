const { uuid } = require('uuidv4');
const Yup = require('yup');

let users = [];

class UserController {
	async index(req, res) {
		return res.json(users);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			username: Yup.string().required('O campo username é obrigatório'),
			email: Yup.string()
				.email('Email inválido')
				.required('O campo email é obrigatório'),
			birth_date: Yup.date('Data inválida').required(
				'O campo birth_date é obrigatório'
			),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Formato de inválido' });
		}

		const { email, username, birth_date } = req.body;

		const userExist = users.some(user => user.email === email);

		if (!userExist) {
			const user = {
				id: uuid(),
				email,
				username,
				birth_date,
			};

			users.push(user);

			return res.json(user);
		}

		return res
			.status(400)
			.json({ error: 'Já existe uma conta vinculada a este email' });
	}
}

module.exports = new UserController();
