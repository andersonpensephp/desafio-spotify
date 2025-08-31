import { SpotifyLogoIcon } from '@phosphor-icons/react';
import LanguageSelect from '../LanguageSelect/LanguageSelect';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SpotifyLogoIcon size={32} />
        <h1 className="text-xl md:text-base lg:text-lg xl:text-2xl font-bold">Spotify API</h1>
      </div>
      <LanguageSelect />
    </header>
  );
};
