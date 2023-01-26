import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store';
import { firebaseAuth } from '../utils/firebase.config';
import styled from "styled-components";
import Slider from '../components/Slider';
import Navbar from '../components/Navbar';
import SelectGenre from '../components/selectGenre';

export default function Movies() {
    const [isscroll, Setisscroll] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    window.onscroll = () => {
        Setisscroll(window.pageYOffset === 0 ? false : true);
        return () => { (window.onscroll = null) }
    }
    const genres = useSelector((state) => state.netflix.genres);
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const movies = useSelector((state) => state.netflix.movies);
    useEffect(() => {
        dispatch(getGenres());

    });
    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({ type: "tv" }));
        }
    }, [genresLoaded]);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            // if (currentUser) {
            //     navigate("/");
            // }
        })
    })

    return (
        <Container>
            <div className="navbar">
                <Navbar isScroll={isscroll} />
            </div>
            <div className="data">
                <SelectGenre genres={genres} type="tv" />
                {movies.length ? <Slider movies={movies} /> : <h1>Movies not Available</h1>}
            </div>
        </Container>
    )
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
