import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { SearchContextProvider } from './context/SearchContext'
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary'

const queryClient = new QueryClient()

function App() {
  return (
    <ErrorBoundary>
      <SearchContextProvider>
        <BrowserRouter basename="/desafio-spotify">
          <QueryClientProvider client={queryClient}>
            <AppRoutes />
          </QueryClientProvider>
        </BrowserRouter>
      </SearchContextProvider>
    </ErrorBoundary>
  )
}

export default App
