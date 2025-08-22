import { WarningCircleIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <WarningCircleIcon size={50} color="red" />
        <p>Ops! Algo deu errado</p>
        <p>{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} className="mt-4">
          Tentar novamente
        </Button>
      )}
    </div>
  );
};
