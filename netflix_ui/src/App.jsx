import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Movies from './pages/movies'
import Player from './pages/Player'
import Signup from './pages/signup'
import Tvshows from './pages/tvshows'

export default function App() {
  return (
    <Router>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/player" element={<Player />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
      <Route exact path="/movies" element={<Movies />} />
      <Route exact path="/tvshows" element={<Tvshows />} />
    </Routes>
    </Router>
      
  )
}
