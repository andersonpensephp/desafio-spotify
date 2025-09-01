import { WarningCircleIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <WarningCircleIcon size={50} color="red" />
        <p>{t('ops')}</p>
        <p>{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} className="mt-4">
          {t('retry')}
        </Button>
      )}
    </div>
  );
};
