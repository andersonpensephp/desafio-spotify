import ErrorFallback from "../ErrorFallback/ErrorFalback";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary
      fallback={<ErrorFallback />}
      onReset={() => window.location.reload()}
    >
      {children}
    </ReactErrorBoundary>
  )
}