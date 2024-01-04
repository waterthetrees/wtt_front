import { render } from '@testing-library/react';
import React from 'react';

import Userprofile from '@/pages/Userprofile/UserProfile';

describe('UserProfile', () => {
  it('renders UserProfile correctly', () => {
    const userProfile = render(<Userprofile />);
    expect(userProfile).toMatchSnapshot();
  });
});
