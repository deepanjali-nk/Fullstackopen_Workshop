const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: [3, 'Content must be at least 3 characters long'],
  },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  important: Boolean
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});


module.exports = mongoose.model('Note', noteSchema);