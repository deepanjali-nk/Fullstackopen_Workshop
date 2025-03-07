const express = require('express');
const app = express();
const cors = require('cors');
const notesController = require('./controllers/notes');
const usersController = require('./controllers/users');
const { errorHandler } = require('./utils/middleware');
const loginController = require('./controllers/login');


app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.use('/api/notes', notesController);
app.use('/api/users', usersController);
app.use('/api/login', loginController);


app.use(errorHandler);
module.exports = app;
