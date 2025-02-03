const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const url = `mongodb+srv://deepanjali:hey123@cluster0.ta6ys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery', false);
mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

  const noteSchema = new mongoose.Schema({
    content: {
      type: String,
      minLength: [3, 'Content must be at least 3 characters long']
    },
    important: Boolean
  })
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Note = mongoose.model('Note', noteSchema);

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

app.get('/api/notes', (request, response, next) => {
  Note.find({})
    .then((notes) => {
      response.json(notes);
    })
    .catch((error) => {
      next(error);
    });
});

app.get('/api/notes/:id', (request, response, next) => {
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

app.delete('/api/notes/:id', (request, response, next) => {
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

app.post('/api/notes', (request, response) => {
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

app.put('/api/notes/:id', (request, response, next) => {
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

// Centralized error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Malformatted ID' });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
