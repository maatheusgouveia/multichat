const UserController = require('../../src/controllers/UserController');
const { User } = require('../factories');

const mockResponse = () => ({
	status: status => status,
	json: value => value,
});

const mockRequest = ({ body = {} }) => ({ body });

test('It should list all users without errors', async () => {
	const req = mockRequest({});
	const res = mockResponse();
	const users = await UserController.index(req, res);
	expect(users.length).toBe(0);
});

test('It should create a new user without errors', async () => {
	const req = mockRequest({ body: User() });

	const res = mockResponse();

	const user = await UserController.store(req, res);

	expect(user).toHaveProperty('id');
});
