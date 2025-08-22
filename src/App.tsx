import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { BrowserRouter } from 'react-router-dom';

import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import { SearchContextProvider } from './context/SearchContext';
import AppRoutes from './routes';

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <SearchContextProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AppRoutes />
          </QueryClientProvider>
        </BrowserRouter>
      </SearchContextProvider>
    </ErrorBoundary>
  );
}

export default App;
