import React from 'react';
import { render, screen } from '@testing-library/react';
import {createMemoryHistory} from "history";
import { Router } from 'react-router-dom';
import Details from '../components/Details';

test('renders country', () => {

  const history = createMemoryHistory();

  history.push(`/details`)

  render(
      <Router history={history}>
          <Details/>
      </Router>
  );
  const details = screen.getByTestId("details");
  expect(details).toBeInTheDocument();
});