import React, { useEffect } from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import video from "../assets/video.mp4";
import { useDispatch, useSelector } from "react-redux";
export default function Player() {
  const navigate = useNavigate();
  const { trailerUrl } = useParams();


  return (
    <Container>
      <div className="player">
        <div className="back">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <iframe
          title="Movie Trailer"
          src={`https://www.youtube.com/embed/${trailerUrl}?autoplay=1&mute=1`}
          allowFullScreen
          width={"100%"}
          height={"100%"}
        ></iframe>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;