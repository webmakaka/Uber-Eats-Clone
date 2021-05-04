import { ApolloProvider } from '@apollo/client';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import { CreateAccount, CREATE_ACCOUNT_MUTATION } from 'pages/create-account';
import { render, RenderResult, waitFor } from 'test-utils';
import { UserRole } from '__generated__/globalTypes';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => {
  const realModule = jest.requireActual('react-router-dom');
  return {
    ...realModule,
    useHistory: () => {
      return {
        push: mockPush,
      };
    },
  };
});

describe('<CreateAccount />', () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;

  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <CreateAccount />
        </ApolloProvider>
      );
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders OK ', async () => {
    await waitFor(() => {
      expect(document.title).toBe('Create Account | Nuber Eats');
    });
  });

  it('renders validation errors ', async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const button = getByRole('button');

    await waitFor(() => {
      userEvent.type(email, 'wrong@email');
    });

    let errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/please enter a valid email/i);
    await waitFor(() => {
      userEvent.clear(email);
    });
    errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/email is required/i);
    await waitFor(() => {
      userEvent.type(email, 'right@gmail.com');
      userEvent.click(button);
    });
    errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/password is required/i);
  });

  it('submits mutation with form values', async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const button = getByRole('button');

    const formData = {
      email: 'right@gmail.com',
      password: '1234567',
      role: UserRole.Client,
    };

    const mockedLoginMutationResponse = jest.fn().mockResolvedValue({
      data: {
        createAccount: {
          ok: true,
          error: 'mutation-error',
        },
      },
    });

    mockedClient.setRequestHandler(
      CREATE_ACCOUNT_MUTATION,
      mockedLoginMutationResponse
    );

    jest.spyOn(window, 'alert').mockImplementation(() => null);

    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(button);
    });

    expect(mockedLoginMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedLoginMutationResponse).toHaveBeenCalledWith({
      createAccountInput: {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      },
    });
    expect(window.alert).toHaveBeenCalledWith('Account Created! Log in now!');
    const mutationError = getByRole('alert');
    expect(mockPush).toHaveBeenCalledWith('/');
    expect(mutationError).toHaveTextContent('mutation-error');
  });

  // End of create-account.spec.tsx
});
