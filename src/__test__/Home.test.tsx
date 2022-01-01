import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

test('renders app test', () => {
  render(<Home />);
  const home = screen.getByTestId("home");
  expect(home).toBeInTheDocument();
})