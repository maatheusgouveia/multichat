const express = require('express');

const routes = express.Router();

const MessageController = require('./controllers/MessageController');

routes.get('/messages', MessageController.index);

routes.post('/messages', MessageController.store);

module.exports = routes;
