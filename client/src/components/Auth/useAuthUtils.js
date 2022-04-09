/* eslint-disable no-restricted-globals */
import { useAuth0 } from '@auth0/auth0-react';

export default function useAuthUtils() {
  const { loginWithRedirect } = useAuth0();

  const loginToPage = (destination) => loginWithRedirect({
    appState: {
      returnTo: destination,
    },
  });

  const loginToCurrentPage = () => loginToPage(location.pathname + location.hash);

  return {
    loginToPage,
    loginToCurrentPage,
  };
}
