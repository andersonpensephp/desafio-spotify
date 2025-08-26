import { SpotifyLogoIcon } from '@phosphor-icons/react';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/ui/button';
import { loginSpotify } from '../../libs/auth';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/artists');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SpotifyLogoIcon size={60} />
      <h1 className="text-3xl font-bold mb-4">{t('login')}</h1>
      <Button onClick={loginSpotify}>{t('loginSpotify')}</Button>
    </div>
  );
}
