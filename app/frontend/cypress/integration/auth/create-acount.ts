describe('Crate Account', () => {
  const user = cy;

  it('should see email / password validation errors', () => {
    user.visit('/');
    user.findByText(/create an account/i).click();
    user.findByPlaceholderText(/email/i).type('wrong@gmail');
    user.findByRole('alert').should('have.text', 'Please enter a valid email');
    user.findByPlaceholderText(/email/i).clear();
    user.findByRole('alert').should('have.text', 'Email is required');
    user.findByPlaceholderText(/email/i).type('right@gmail.com');
    user
      .findByPlaceholderText(/password/i)
      .type('a')
      .clear();
    user.findByRole('alert').should('have.text', 'Password is required');
  });

  it('should be able to create account and login', () => {
    user.intercept('http://localhost:4000/graphql', (req) => {
      const { operationName } = req.body;
      if (operationName && operationName === 'createAccountMutation') {
        req.reply((res) => {
          res.send({
            data: {
              createAccount: {
                ok: true,
                error: 'null',
                __typename: 'CreateAccountOutput',
              },
            },
          });
        });
      }
    });
    user.visit('/create-account');
    user.findByPlaceholderText(/email/i).type('right1@gmail.com');
    user.findByPlaceholderText(/password/i).type('123456');
    user.findByRole('button').click();

    user.wait(1000);
    user.title().should('eq', 'Login | Nuber Eats');
  });

  // user.findByPlaceholderText(/email/i).type('right1@gmail.com');
  //   user.findByPlaceholderText(/password/i).type('123456');
  //   user.findByRole('button').click();

  //   user.window().its('localStorage.nuber-token').should('be.a', 'string');

  // End of create-account.ts
});
