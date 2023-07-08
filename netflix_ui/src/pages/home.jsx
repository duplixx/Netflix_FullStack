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
    const [isscroll,Setisscroll]=React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    window.onscroll=()=>{
        Setisscroll(window.pageYOffset===0?false:true);
        return ()=>{(window.onscroll=null)}
        }
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const movies =useSelector((state)=>state.netflix.movies);
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
        <SplideSlide>
        <img src={BackgroundImage0} alt="Image 1" />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center"
            >
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </SplideSlide>
      <SplideSlide>
        <img src={BackgroundImage1} alt="Image 2" />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center"
            >
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </SplideSlide>
      <SplideSlide>
        <img src={BackgroundImage2} alt="Image 3" />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button
              onClick={() => navigate("/player")}
              className="flex j-center a-center"
            >
              <FaPlay />
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </SplideSlide>
        </SplideTrack>
      </div>
    </Splide>
        
      </div>
      <Slider className="" movies={movies}/>
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
