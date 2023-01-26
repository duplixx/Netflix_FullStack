import React from 'react'
import Cardslider from './cardslider'


export default React.memo(function Slider({movies}) {
  const getMoviesfromRange=(from,to)=>{
    return movies.slice(from,to)
  }
  return (
    <div>
      <Cardslider Title="Trending Now" data={getMoviesfromRange(0,10)}/>
      <Cardslider Title="New Releases" data={getMoviesfromRange(10,20)}/>
      <Cardslider Title="Blockbuster Movies" data={getMoviesfromRange(20,30)}/>
      <Cardslider Title="Popular on Netflix" data={getMoviesfromRange(30,40)}/>
      <Cardslider Title="Horror" data={getMoviesfromRange(40,50)}/>
      <Cardslider Title="Romance" data={getMoviesfromRange(50,60)}/>
    </div>
  )
})
