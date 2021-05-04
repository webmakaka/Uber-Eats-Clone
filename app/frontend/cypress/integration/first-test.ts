describe('First Test', () => {
  const user = cy;

  it('should see login page', () => {
    user.visit('/').title().should('eq', 'Login | Nuber Eats');
  });

  it('can see email / password validation errors', () => {
    user.visit('/');
    user.findByPlaceholderText(/email/i).type('wrong@email');
    user.findByRole('alert').should('have.text', 'Please enter a valid email');
    user.findByPlaceholderText(/email/i).clear();
    user.findByRole('alert').should('have.text', 'Email is required');
    user.findByPlaceholderText(/email/i).type('wrong@email.com');
    user
      .findByPlaceholderText(/password/i)
      .type('123456')
      .clear();
    user.findByRole('alert').should('have.text', 'Password is required');
  });

  it('can fill out the form', () => {
    user.visit('/');
    user.findByPlaceholderText(/email/i).type('right@gmail.com');
    user.findByPlaceholderText(/password/i).type('1234');
    user
      .findByRole('button')
      .should('not.have.class', 'pointer-events-none')
      .click();
    user.window().its('localStorage.nuber-token').should('be.a', 'string');
  });

  it('sign up', () => {
    user.visit('/create-account');
  });

  // End of first-test.ts
});
