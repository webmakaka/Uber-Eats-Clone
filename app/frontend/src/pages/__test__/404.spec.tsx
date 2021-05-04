import { NotFound } from 'pages/404';
import { render, waitFor } from 'test-utils';

describe('<NotFound />', () => {
  it('renders OK', async () => {
    render(<NotFound />);
    await waitFor(() => {
      expect(document.title).toBe('Not Found | Nuber Eats');
    });
  });
});
