import { render, screen } from '@testing-library/react';
import App from './components/App';

// eslint-disable-next-line no-undef
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  // eslint-disable-next-line no-undef
  expect(linkElement).toBeInTheDocument();
});
