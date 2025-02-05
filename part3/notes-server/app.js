const express = require('express');
const app = express();
const cors = require('cors');
const notesController = require('./controllers/notes');
const { errorHandler } = require('./utils/middleware');


app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.use('/api/notes', notesController);


app.use(errorHandler);
module.exports = app;
