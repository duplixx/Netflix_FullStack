//dependencies
import React, { useEffect } from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import '@splidejs/splide/css';
//components
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
//assets
import BackgroundImage0 from '../assets/home.jpg';
import BackgroundImage1 from '../assets/mi.jpeg';
import BackgroundImage2 from '../assets/opp.jpg';

import MovieLogo from '../assets/homeTitle.webp';
//logos
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { fetchMovies, getGenres } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import LazyLoad from 'react-lazyload';
import ReactLoading from "react-loading";
import Footer from '../components/footer';

// const splide = new Splide( '.splide', {
//   type   : 'loop',
//   drag   : 'free',
//   focus  : 'center',
//   perPage: 3,
//   autoScroll: {
//     speed: 1,
//   },
// } );


export default function Home() {
    const moviesData = useSelector((state) => state.netflix.movies);
    const [isscroll,Setisscroll]=React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    window.onscroll=()=>{
        Setisscroll(window.pageYOffset===0?false:true);
        return ()=>{(window.onscroll=null)}
        }
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
useEffect(() => {
    dispatch(getGenres());
    
});
useEffect(() => {
  if(genresLoaded) {
    dispatch(fetchMovies({type:"all"}));
  }
}, [genresLoaded]);

  return (
    <Container>
    <Navbar isScroll={isscroll} />
      <div className="hero">
      <Splide hasTrack={false} options={{
        type: 'loop',
        autoplay: true,
        interval: 300, // Autoplay interval in milliseconds (e.g., 3000ms = 3 seconds)
        pauseOnHover: false, // Whether to pause autoplay on hover or not
      }}>
      <div className="custom-wrapper">
        <div className="splide__progress">
          <div className="splide__progress__bar" />
        </div>
        <SplideTrack>
        {
          moviesData.slice(0,4).map((movie,index)=>(

            <SplideSlide key={index}>
            <LazyLoad>
            <img src={`https://image.tmdb.org/t/p/original${movie.image}`} alt={movie.name} className="w-96 h-auto object-cover" />
            </LazyLoad>
            
            <div className="container ">
          <div className="ml-[140px]  text-white">
            <span className='mt-[50px]'><h1 className='z-4 text-6xl font-bold  mt-4'>{movie.name}</h1></span>
          </div>
          <div className="buttons flex">
            <button
              onClick={() => navigate(`/player/${movie.id}`)}
              className="flex j-center a-center "
            >
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center"  onClick={() => navigate(`/details/${movie.id}`)}>
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
            </SplideSlide>
          ))
        }
        </SplideTrack>
        </div>
    </Splide>
        
      </div>
      <Slider className="" movies={moviesData}/>
      <Footer/>
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
          z-index: 99;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.4rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2.4rem;
          border: none;
          cursor: pointer;
          transition: 0.2s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.8rem;
            }
          }
        }
      }
    }
  }
`;
