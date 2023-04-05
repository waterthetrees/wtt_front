import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

// Create a client for react-query calls.  Don't automatically refetch the data when the window is
// focused since it's not changing that frequently.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Create an MUI theme so that any child can access it for styling via the hooks.
const theme = createTheme({
  typography: {
    fontFamily: 'inherit',
  },
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (story) =>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {story()}
      </QueryClientProvider>
    </ThemeProvider>
];