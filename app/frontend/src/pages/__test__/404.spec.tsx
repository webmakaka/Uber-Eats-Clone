import { render, waitFor } from '@testing-library/react';
import { NotFound } from 'pages/404';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<NotFound />', () => {
  it('renders OK', async () => {
    render(
      <HelmetProvider>
        <Router>
          <NotFound />
        </Router>
      </HelmetProvider>
    );
    await waitFor(() => {
      expect(document.title).toBe('Not Found | Nuber Eats');
    });
  });
});
