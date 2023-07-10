import React from 'react'
import Loader from '../assets/loader.mp4'
export default function Loading() {
  return (
    <div className="w-full flex justify-center">
      <video src={Loader} autoPlay muted loop>
        {/* Fallback content if video format is not supported */}
        Sorry, your browser does not support the video element.
      </video>
    </div>
  )
}
