import { SpotifyLogoIcon } from "@phosphor-icons/react"

export const Header = () => {
  return (
    <header
      className="w-full bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SpotifyLogoIcon size={32} />
        <h1 className="text-2xl font-bold">Spotify API Test</h1>
      </div>
    </header>
  )
}