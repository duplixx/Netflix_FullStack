import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Movies from './pages/movies';
import Player from './pages/Player';
import Signup from './pages/signup';
import Tvshows from './pages/tvshows';
import MyList from './pages/mylist';
import Details from './pages/details';
// import Loading from 'react-loading';
import Loading from './components/loading';

export default function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4500);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading/>
      ) : (
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/player/:movieId" element={<Player />} />
            <Route exact path="/details/:movieId" element={<Details />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
            <Route exact path="/movies" element={<Movies />} />
            <Route exact path="/tvshows" element={<Tvshows />} />
            <Route exact path="/mylists" element={<MyList />} />
          </Routes>
        </Router>
      )}
    </>
  );
}
