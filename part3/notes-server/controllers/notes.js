const app = require('express').Router();
const Note = require('../models/note');

app.get('/', (request, response, next) => {
    Note.find({})
      .then((notes) => {
        response.json(notes);
      })
      .catch((error) => {
        next(error);
      });
  });
app.get('/:id', (request, response, next) => {
    Note.findById(request.params.id)
      .then((note) => {
        if (note) {
          response.json(note);
        } else {
          response.status(404).json({ error: `Note with id ${request.params.id} not found` });
        }
      })
      .catch((error) => {
        next(error);
      });
  });
  app.delete('/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
      .then((result) => {
        if (result) {
          response.status(204).end(); // Successfully deleted
        } else {
          response.status(404).json({ error: `Note with id ${request.params.id} not found` });
        }
      })
      .catch((error) => {
        next(error);
      });
  });
  app.post('/', (request, response) => {
    const body = request.body;
    if (!body.content) {
      return response.status(400).json({ error: 'Content is required' });
    }

    const note = new Note({
      content: body.content,
      important: body.important || false,
    });
    note.save()
      .then((savedNote) => {
        response.status(201).json(savedNote); // Created successfully
      })
      .catch((error) => {
        console.error('Error saving note:', error.message);
        response.status(500).json({ error: 'Internal server error' });
      });
  });
  app.put('/:id', (request, response, next) => {
    const body = request.body;
    const note = {
      content: body.content,
      important: body.important,
    };
    Note.findByIdAndUpdate(request.params.id, note, { new: true, runValidators: true, context: 'query' })
      .then((updatedNote) => {
        if (updatedNote) {
          response.json(updatedNote);
        } else {
          response.status(404).json({ error: `Note with id ${request.params.id} not found` });
        }
      })
      .catch((error) => {
        next(error);
      });
  });

  module.exports = app;