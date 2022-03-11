import { useMediaQuery } from '@mui/material';

export const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Pass noSsr: true so that useMediaQuery() doesn't return false initially, which it does to
// accommodate SSR.
export const useIsMobile = () => useMediaQuery((theme) => theme.breakpoints.down('sm'), { noSsr: true });
