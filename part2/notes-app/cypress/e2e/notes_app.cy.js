describe('Note app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Shrestha',
      username: 'Deepanjali_nk',
      password: 'okay'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
    // cy.request('POST', 'http://localhost:3001/api/login', {
    //   username: 'mluukkai', password: 'salainen'
    // }).then(response => {
    //   localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
    //   cy.visit('http://localhost:5173')
    // })
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click() 
    cy.get('#username').type('Deepanjali_nk')
    cy.get('#password').type('notokay')
    cy.get('#LoginButton').click()
    cy.get('.error').contains('wrong credentials')

    // cy.contains('wrong credentials')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('fake note')
  })
  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username').type('Deepanjali_nk')
    cy.get('#password').type('okay')
    cy.get('#LoginButton').click()
    cy.contains('Shrestha logged-in')
  })
    describe('when logged in', function() {
      beforeEach(function() {
        cy.contains('login').click()
        cy.get('#username').type('Deepanjali_nk')
        cy.get('#password').type('okay')
        cy.get('#LoginButton').click()
      })

      it('a new note can be created', function() {
        cy.contains('new note').click()
        cy.get('#inputNote').type('a note created by cypress')
        cy.contains('save').click()
        cy.contains('a note created by cypress')
      })
      describe('and a note exists', function () {
        beforeEach(function () {
          cy.contains('new note').click()
          cy.get('input').type('another note cypress')
          cy.contains('save').click()
        })
  
        it('it can be made not important', function () {
          cy.contains('another note cypress')
            .contains('change true')
            .click()
  
          cy.contains('another note cypress')
            .contains('change false')
        })
      })
    })
})