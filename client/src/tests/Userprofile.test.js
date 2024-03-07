import { useAuth0 } from '@auth0/auth0-react';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import {
  useUserAdoptedQuery,
  useUserLikedQuery,
  useUserPlantedQuery,
  useUserTreeHistoryQuery,
} from '@/api/queries';
import Userprofile from '@/pages/Userprofile/UserProfile';

jest.mock('@auth0/auth0-react');
jest.mock('@/api/queries');

describe('UserProfile', () => {
  beforeEach(() => {
    // Reset mocks before each test
    useAuth0.mockClear();
    useUserAdoptedQuery.mockClear();
    useUserLikedQuery.mockClear();
    useUserPlantedQuery.mockClear();
    useUserTreeHistoryQuery.mockClear();
  });
  it('renders UserProfile correctly', () => {
    useAuth0.mockReturnValue({
      user: { nickname: 'testUser', email: 'test@example.com' },
    });
    useUserAdoptedQuery.mockReturnValue({ data: [{ id: 1, name: 'Tree 1' }] });
    useUserLikedQuery.mockReturnValue({ data: [{ id: 2, name: 'Tree 2' }] });
    useUserPlantedQuery.mockReturnValue({ data: [{ id: 3, name: 'Tree 3' }] });
    useUserTreeHistoryQuery.mockReturnValue({
      data: [{ id: 4, name: 'Tree 4' }],
    });
    const userProfile = render(
      <MemoryRouter>
        <Userprofile />
      </MemoryRouter>,
    );
    expect(userProfile).toMatchSnapshot();
  });
});
