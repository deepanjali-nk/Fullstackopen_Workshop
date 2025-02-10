const app = require('express').Router();
const Note = require('../models/note');

app.get('/', async (request, response, next) => {
    try {
        const result = await Note.find({});
        response.json(result);
    } catch (error) {
        next(error);
    }
});

app.get('/:id', async (request, response, next) => {
    try {
        const note = await Note.findById(request.params.id);
        if (note) {
            response.json(note);
        } else {
            response.status(404).json({ error: `Note with id ${request.params.id} not found` });
        }
    } catch (error) {
        next(error);
    }
});

app.delete('/:id', async (request, response, next) => {
    try {
        const result = await Note.findByIdAndDelete(request.params.id);
        if (result) {
            response.status(204).end();
        } else {
            response.status(404).json({ error: `Note with id ${request.params.id} not found` });
        }
    } catch (error) {
        next(error);
    }
});

app.post('/', async (request, response, next) => {
    try {
        const { content, important = false } = request.body;
        if (!content) {
            return response.status(400).json({ error: 'Content is required' });
        }

        const note = new Note({ content, important });
        const result = await note.save();
        response.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

app.put('/:id', async (request, response, next) => {
    try {
        const { content, important } = request.body;
        const updatedNote = await Note.findByIdAndUpdate(
            request.params.id,
            { content, important },
            { new: true, runValidators: true, context: 'query' }
        );

        if (updatedNote) {
            response.json(updatedNote);
        } else {
            response.status(404).json({ error: `Note with id ${request.params.id} not found` });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = app;
