import React from 'react'
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
import { useDispatch } from 'react-redux';

export default React.memo(function Card({moviesData,isLiked=false}) {
  const [hover, setHover] = React.useState(false);
  const [email,setEmail]=React.useState(undefined);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email)
    }
    else{
      navigate("/login")
    }
  })
  

  const addToList = async (email, moviesData) => {
    try {
      await axios.post("http://localhost:5000/api/user/add", {
        email,
        data: moviesData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className='flex column' 
    onMouseEnter={()=>setHover(true)}
    onMouseLeave={()=>setHover(false)}>
    <img
        src={`https://image.tmdb.org/t/p/w500${moviesData.image}`}
        alt="movie"
        onClick={() => navigate("/player")}
      />
      {hover && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${moviesData.image}`}
              alt="movie"
              onClick={() => navigate("/player")}
            />
            <video src={video} autoPlay loop muted onClick={() => navigate("/player")} />

          </div>
          <div className="info-container flex-column">
            <h3 className='name' onClick={() => navigate("/player")} >{moviesData.title}</h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp title="play"
                  onClick={() => navigate("/player")}
                />
                <RiThumbUpFill title = "like" />
                <RiThumbDownFill title = "dislike" />
                {isLiked ?(<BsCheck title="Remove From the List" onClick={()=>{dispatch(removeMovieFromLiked({movieId:moviesData.id,email}))}}/>)
                :(<AiOutlinePlus title="Add to the List" onClick={()=>{
                  addToList()
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