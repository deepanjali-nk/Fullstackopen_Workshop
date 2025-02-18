const app = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

app.get('/', async (request, response, next) => {
    try {
        const result = await User.find({}).populate('notes');
        response.json(result);
    } catch (error) {
        next(error);
    }
});

app.get('/:id', async (request, response, next) => {
    try {
        const user = await User.findById(request.params.id);
        if (user) {
            response.json(user);
        } else {
            response.status(404).json({ error: `User with id ${request.params.id} not found` });
        }
    } catch (error) {
        next(error);
    }
});

app.delete('/:id', async (request, response, next) => {
    try {
        const result = await User.findByIdAndDelete(request.params.id);
        if (result) {
            response.status(204).end();
        } else {
            response.status(404).json({ error: `User with id ${request.params.id} not found` });
        }
    } catch (error) {
        next(error);
    }
});

app.post('/', async (request, response, next) => {
    try {
      const { username, name, password } = request.body;
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      const user = new User({
        username,
        name,
        passwordHash,
      });
     const savedUser = await user.save();
      response.status(201).json(savedUser);
    } catch (error) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        return response.status(400).json({ error: 'Username must be unique' });
      }
      next(error);
    }
  });

app.put('/:id', async (request, response, next) => {
    try {
        const { content, important } = request.body;
        const updateduser = await User.findByIdAndUpdate(
            request.params.id,
            { content, important },
            { new: true, runValidators: true, context: 'query' }
        );

        if (updateduser) {
            response.json(updateduser);
        } else {
            response.status(404).json({ error: `User with id ${request.params.id} not found` });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = app;
