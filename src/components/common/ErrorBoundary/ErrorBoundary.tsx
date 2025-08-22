import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '../ErrorFallback/ErrorFalback';

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary fallback={<ErrorFallback />} onReset={() => window.location.reload()}>
      {children}
    </ReactErrorBoundary>
  );
}
