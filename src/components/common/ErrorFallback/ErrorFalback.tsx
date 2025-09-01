import { WarningCircleIcon } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export default function ErrorFallback() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <WarningCircleIcon size={50} color="red" />
      <h1>{t('ops')}</h1>
      <p>{t('tryAgain')}</p>
      <Button onClick={() => window.location.reload()}>{t('retry')}</Button>
    </div>
  );
}
