import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Callback from "../pages/Callback/Callback"
import Artists from "../pages/Artists"
import Artist from "../pages/Artist"
import DefaultLayout from "../layouts/DefaultLayout"
import Album from "../pages/Album"
import NotFound from "../pages/NotFound"

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}