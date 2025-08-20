import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home/Home"
import Callback from "../pages/Callback/Callback"
import Artists from "../pages/Artists/Artists"
import Artist from "../pages/Artist/Artist"
import DefaultLayout from "../layouts/DefaultLayout"

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/artist/:id" element={<Artist />} />
      </Route>
    </Routes>
  )
}