import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { firebaseAuth } from '../utils/firebase.config';
import styled from "styled-components";
import Navbar from '../components/Navbar';
import { getUsersLikedMovies } from '../store/index';
import Card from '../components/card';

export default React.memo(function MyList() {
    const [isscroll, Setisscroll] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.netflix.movies);
    const [email,setEmail]=React.useState(undefined)

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email)
    }
    else{
      navigate("/login")
    }
  })
    window.onscroll = () => {
        Setisscroll(window.pageYOffset === 0 ? false : true);
        return () => { (window.onscroll = null) }
    }
    useEffect(() => {
        if(email){
            dispatch(getUsersLikedMovies(email));
        }
    },[email]);

    return (
        <Container>
            <div className="navbar">
                <Navbar isScroll={isscroll} />
            </div>
            <div className="content flex column">
            <h1 className="text-white">My List</h1>
            <div className='grid flex'>
                {movies.map((movie,index) => {
                    return (
                        <Card moviesData={movie} key={movie.id} index={index} isLiked={true} />
                    )
                })}
            </div>
        </div>
        </Container>
    )
}
);

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
