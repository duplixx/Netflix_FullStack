import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import video from '../assets/video.mp4';
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase.config';
import axios from 'axios';
import { removeMovieFromLiked } from '../store/index';
import { useDispatch, useSelector } from 'react-redux';

export default React.memo(function Card({moviesData,isLiked=false}) {
  const [hover, setHover] = React.useState(false);
  const [email,setEmail]=React.useState(undefined);
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const [trailerUrl,setTrailerUrl]=React.useState(undefined);
  const fetchTrailerUrl =  async (id) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=3d39d6bfe362592e6aa293f01fbcf9b9`
    );  
    setTrailerUrl(data.results[0]?.key);
  };

  React.useEffect(() => {
    if (hover && !trailerUrl) {
      fetchTrailerUrl(moviesData.id);
    }
  }, [hover,trailerUrl,moviesData.id]);




  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email)
    }
    else{
      navigate("/login")
    }
  })
  

  const addToList = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/add", 
      {
       email:email,
       data:moviesData
      });
    } catch (error) {
      console.log(error);
    }
  };
  const navigateToPlayer = () => {
    navigate(`/player/${trailerUrl}`);
  };

  return (
    <Container className='flex column' 
    onMouseEnter={()=>setHover(true)}
    onMouseLeave={()=>setHover(false)}>
    
    <img
        src={`https://image.tmdb.org/t/p/w500${moviesData.image}`}
        alt="movie"
        onClick={navigateToPlayer}
      />
      {hover && (
        <div className="hover">
          <div className="image-video-container">
            <iframe
              title="Movie Trailer"
              src={`https://www.youtube.com/embed/${trailerUrl}?autoplay=0&mute=1`}
            ></iframe>
        
          </div>
          <div className="info-container flex-column">
            <h3 className='name' onClick={navigateToPlayer} >{moviesData.title}</h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp title="play"
                  onClick={navigateToPlayer}
                />
                <RiThumbUpFill title = "like" />
                <RiThumbDownFill title = "dislike" />
                {isLiked ?(<BsCheck title="Remove From the List" onClick={()=>{dispatch(removeMovieFromLiked({movieId:moviesData.id,email}))}}/>)
                :(<AiOutlinePlus title="Add to the List" onClick={()=>{
                  addToList(email,moviesData)
                }}/>)}
                </div>
                <div className="info">
                  <BiChevronDown title="more info"/>
                </div>
                </div> 
                <div className="genres flex">
                {/*<ul className="flex">{moviesData.genres.map((genre,index)=>{
                  <li key={genre}>{genre}</li>
                })}</ul>*/}
        </div>
        </div>
        </div>
      )
      }
      <h4 className='title'>{moviesData.name}</h4>
    </Container>
  )
})

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 140px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;