import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Details() {
  const { movieId } = useParams();
  const [moviesData, setMoviesData] = useState(null);
  const [credits, setCredits] = useState(null);

  const fetchMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=3d39d6bfe362592e6aa293f01fbcf9b9`
    );
    const data = await response.json();
    setMoviesData(data);
  };

  const fetchCredits = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=3d39d6bfe362592e6aa293f01fbcf9b9`
    );
    const data = await response.json();
    setCredits(data);
  };

  useEffect(() => {
    fetchMovies();
    fetchCredits();
  }, []);

  if (!moviesData) {
    return <div>Loading...</div>;
  }
  const sectionStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${moviesData.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="bg-black text-white">
      <main className="px-8 py-12" style={sectionStyle} >
        <div className="flex space-x-8">
          <div className="w-1/4">
            <img
              src={`https://image.tmdb.org/t/p/w500${moviesData.poster_path}`}
              alt="Movie Poster"
              className="w-full rounded-lg shadow-lg opacity-95"
            />
          </div>
          <div className="w-3/4">
            <h1 className="text-6xl font-bold mb-4">{moviesData.title}</h1>
            <p className="text-gray-300 text-xl leading-relaxed mb-6">{moviesData.overview}</p>
            <div className="flex space-x-4 mt-8">
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded">
                Play
              </button>
              <button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded">
                More Info
              </button>
            </div>
          </div>
        </div>
      </main>
      <section className="px-8 py-12">
        <h2 className="text-2xl font-bold mb-6">Rating</h2>
        <div className="flex space-x-6">
          <div className="flex-1 bg-gray-800 p-6 rounded-lg">
            <p className="text-xl text-gray-300">Average Rating</p>
            <p className="text-3xl font-bold text-red-500 mt-2">{moviesData.vote_average}</p>
          </div>
          <div className="flex-1 bg-gray-800 p-6 rounded-lg">
            <p className="text-xl text-gray-300">Vote Count</p>
            <p className="text-3xl font-bold text-red-500 mt-2">{moviesData.vote_count}</p>
          </div>
        </div>
      </section>
      <section className="px-8 py-12">
        <h2 className="text-2xl font-bold mb-6">Cast</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {credits && credits.cast.slice(0,8).map((cast) => (
            <div className="bg-gray-800 p-6 rounded-lg hover:pt-0 hover:pr-0 hover:pl-0" key={cast.id}>
              <img
                src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`}
                alt="Cast Profile"
                className="w-full h-48 object-cover rounded-md mb-4 hover:h-64"
              />
              <h3 className="text-lg font-bold">{cast.name}</h3>
              <p className="text-gray-300">{cast.character}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
