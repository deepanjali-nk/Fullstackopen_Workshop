const { test, before, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const mongoose = require('mongoose');
const helper=require('./test_helper');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const MONGODB_URI = require('../utils/config').url;

before(async () => {
  console.log('Connecting to test database...');
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('Test database connected');
  await User.deleteMany({});
  console.log('Cleared test database');
});


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  // test('creation fails with proper statuscode and message if username already taken', async () => {
  //   const usersAtStart = await helper.usersInDb()

  //   const newUser = {
  //     username: 'root',
  //     name: 'Superuser',
  //     password: 'salainen',
  //   }

  //   const result = await api
  //     .post('/api/users')
  //     .send(newUser)
  //     .expect(400)
  //     .expect('Content-Type', /application\/json/)

  //   const usersAtEnd = await helper.usersInDb()
  //   assert(result.body.error.includes('Username must be unique'));

  //   assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  // })
})
after(async () => {
  await mongoose.connection.close();
  console.log(' Test database connection closed');
});
