import { render, waitFor } from '@testing-library/react';
import { isLoggedInVar } from 'apolloConfig';
import { App } from 'components/app';

jest.mock('routers/logged-out-router', () => {
  return {
    LoggedOutRouter: () => <span>logged-out</span>,
  };
});

jest.mock('routers/logged-in-router', () => {
  return {
    LoggedInRouter: () => <span>logged-in</span>,
  };
});

describe('<App />', () => {
  it('renders LoggdOutRouter', () => {
    const { debug, getByText } = render(<App />);
    getByText('logged-out');
  });
  it('renders LoggdInRouter', async () => {
    const { debug, getByText } = render(<App />);
    await waitFor(() => {
      isLoggedInVar(true);
    });
    getByText('logged-in');
  });
});
