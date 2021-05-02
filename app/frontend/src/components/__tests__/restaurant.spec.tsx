import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Restaurant } from 'components/restaurant';
import { BrowserRouter as Router } from 'react-router-dom';

describe('<Restaurant />', () => {
  it('renders OK with props', () => {
    const restaurantProps = {
      id: '1',
      name: 'nameTest',
      coverImg: 'x',
      categoryName: 'categoryTest',
    };

    const { getByText, container } = render(
      <Router>
        <Restaurant {...restaurantProps} />
      </Router>
    );
    getByText(restaurantProps.name);
    getByText(restaurantProps.categoryName);
    expect(container.firstElementChild).toHaveAttribute(
      'href',
      `/restaurants/${restaurantProps.id}`
    );
  });
});
