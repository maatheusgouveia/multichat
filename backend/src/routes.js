const express = require('express');

const routes = express.Router();

const MessageController = require('./controllers/MessageController');
const UserController = require('./controllers/UserController');

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.get('/messages', MessageController.index);
routes.post('/messages', MessageController.store);

module.exports = routes;
