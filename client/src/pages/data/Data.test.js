import React, { useEffect } from 'react';
import { render, cleanup } from '@testing-library/react';
import Data from './Data';

afterEach(cleanup);

test('renders menu', () => {
  const { getByText } = render(
    <Data />,
  );

  // getByText('Map');
});
