import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { BrowserRouter } from 'react-router-dom';

import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import { SearchContextProvider } from './context/SearchContextProvider';
import AppRoutes from './routes';
import i18next from './i18n';
import { I18nextProvider } from 'react-i18next';

const queryClient = new QueryClient();

function App() {
  return (
    <I18nextProvider i18n={i18next}>
      <ErrorBoundary>
        <SearchContextProvider>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <AppRoutes />
            </QueryClientProvider>
          </BrowserRouter>
        </SearchContextProvider>
      </ErrorBoundary>
    </I18nextProvider>
  );
}

export default App;
