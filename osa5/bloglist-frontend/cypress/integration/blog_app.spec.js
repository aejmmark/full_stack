describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Testy Tester',
      username: 'testy',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testy')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
      cy.contains('testy')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('sneaky')
      cy.get('#password').type('baddie')
      cy.get('#login-button').click()
      cy.contains('invalid')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testy')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#visibility').click()
      cy.get('#title').type('testing blog')
      cy.get('#author').type('testy')
      cy.get('#url').type('http://test.com')
      cy.get('#submit-blog').click()
      cy.contains('testing blog by testy')
    })

    describe('and after a blog has been created', function() {
      beforeEach(function() {
        cy.get('#visibility').click()
        cy.get('#title').type('testing blog')
        cy.get('#author').type('testy')
        cy.get('#url').type('http://test.com')
        cy.get('#submit-blog').click()
        cy.wait(1000)
      })

      it('it can be liked', function() {
        cy.get('#expand-button').click()
        cy.get('#like-button').click()
        cy.contains('likes: 1')
      })

      it('it can be removed by the creator', function() {
        cy.get('#expand-button').click()
        cy.get('#remove-button').click()
        cy.contains('testing blog by testy').should('not.exist')
      })

      it('it cannot be removed by others', function() {
        cy.get('#logout-button').click()
        const user = {
          name: 'Other Tester',
          username: 'other',
          password: 'secret'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.get('#username').type('other')
        cy.get('#password').type('secret')
        cy.get('#login-button').click()
        cy.get('#expand-button').click()
        cy.contains('remove').should('not.exist')
      })

      describe('and after another blog has been created', function() {
        beforeEach(function() {
          cy.get('#visibility').click()
          cy.get('#title').type('second')
          cy.get('#author').type('testy')
          cy.get('#url').type('http://test.com')
          cy.get('#submit-blog').click()
          cy.wait(1000)
        })

        it('the most liked blog appears on top', function() {
          cy.get('#blogs').within(() => {
            cy.get('#second').within(() => {
              cy.get('#expand-button').click()
              cy.get('#like-button').click()
            })
          })
          cy.get('#blogs').within(() => {
            cy.get('div').first().contains('second by testy')
          })
        })
      })
    })
  })
})