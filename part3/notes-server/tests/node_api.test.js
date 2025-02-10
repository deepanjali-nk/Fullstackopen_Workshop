const { test, before, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const { url } = require('../utils/config');
const helpers=require('./test_helper');
const Note = require('../models/note');


beforeEach(async () => {
  await Note.deleteMany({})
  const noteObjects = helpers.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
})
before(async () => {
  console.log('Connecting to test database...');
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('✅ Test database connected');
});


describe('Testing get methods', () => {
test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are n notes', async () => {
  const response = await helpers.notesInDb();
  assert.strictEqual(response.length, helpers.initialNotes.length);
});

test('the first note is about HTTP methods', async () => {
  const response = await helpers.notesInDb();
  const contents = response.map(e => e.content);
  assert.strictEqual(contents.includes(helpers.initialNotes[0].content), true);
});
})


describe('Testing post methods', () => {
test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)

  assert.strictEqual(response.body.length, helpers.initialNotes.length + 1)

  assert(contents.includes('async/await simplifies making async calls'))
});
});
after(async () => {
  await mongoose.connection.close();
  console.log('✅ Test database connection closed');
});
