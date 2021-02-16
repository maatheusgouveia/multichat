const faker = require('faker');
const { uuid } = require('uuidv4');

const User = () => ({
	username: faker.name.findName(),
	email: faker.internet.email(),
	birth_date: faker.date.past(),
});

module.exports = { User };
