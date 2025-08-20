import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home/Home"
import ListArtists from "../pages/ListArtists/ListArtists"
import Callback from "../pages/Callback/Callback"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/artists" element={<ListArtists />} />
    </Routes>
  )
}