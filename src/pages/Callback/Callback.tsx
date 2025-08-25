import { SpinnerIcon } from '@phosphor-icons/react';
import axios from 'axios';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || '';
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI || '';
const AUTH_URL = import.meta.env.VITE_SPOTIFY_AUTHORIZED || '';

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function getToken() {
      const code = new URLSearchParams(window.location.search).get('code');
      const codeVerifier = localStorage.getItem('code_verifier');

      if (!code) {
        console.log('Nenhum código encontrado');
        return;
      }

      try {
        const body = new URLSearchParams({
          client_id: CLIENT_ID,
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
          code_verifier: codeVerifier!,
        });

        const response = await axios.post(AUTH_URL + '/api/token', body, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        const data = response.data;

        if (data) {
          localStorage.setItem('access_token', data?.access_token);
          localStorage.setItem('spotify_refresh', data.refresh_token);

          navigate('/artists');
        } else {
          console.log('Nenhum token encontrado');
        }
      } catch (error) {
        console.log(error);
      }
    }

    getToken();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SpinnerIcon size={60} className='animate-spin' />
    </div>
  );
}
