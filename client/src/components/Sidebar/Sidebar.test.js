import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';

afterEach(cleanup);

test('renders menu', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  getByText('Map');
  getByText('About');
  getByText('Contact');
});
