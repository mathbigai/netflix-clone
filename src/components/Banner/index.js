import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import categories, { getMovieInfo, getMovies } from "../api/api";
import { Link } from "react-router-dom";
import "./estilos.css";
function Banner() {
  const [movie, setMovie] = useState({});
  const [type, setType] = useState({});

  const fetchRandomMovie = async () => {
    try {
      const netflixOriginalsCategory = categories.find(
        (category) => category.name === "trending"
      );
      const data = await getMovies(netflixOriginalsCategory.path);
      const randomIndex = Math.floor(Math.random() * data?.results.length);
      const dataInfo = await getMovieInfo(
        data?.results[randomIndex].id,
        data?.results[randomIndex].media_type,
        "language=pt-BR"
      );
      setType(data?.results[randomIndex].media_type);
      setMovie(dataInfo);
    } catch (error) {
      console.log("Error fetchRandomMovie", error);
    }
  };

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }

  let fistDateMovie = new Date(movie?.release_date);
  let fistDateTV = new Date(movie?.first_air_date);
  let genres = [];
  for (let i in movie?.genres) {
    genres.push(movie?.genres[i].name);
  }

  return (
    <div>
      <header className="banner-container">
        {type === "movie" ? (
          <div>
            <img
              className="banner-image"
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            />
            <div className="border-image" />
            <div className="banner-content">
              <h1 className="banner-title">
                {movie?.title || movie?.name || movie?.original_name}
              </h1>
              <div className="movie-info">
                <div className="movie-vote-banner">
                  {movie.vote_average} pontos
                </div>

                <div className="movie-year">{fistDateMovie.getFullYear()}</div>
                <div className="movie-time">{movie?.runtime} minutos</div>
              </div>
              <div className="banner-buttons-container">
                <Link to={`/movie/?id=${movie?.id}&type=movie`}>
                  <button
                    className="banner-button"
                    alt={`/movie/${movie?.id}&type=`}
                  >
                    Assistir
                  </button>
                </Link>
              </div>
              <div className="banner-description">
                <h2>{truncate(movie?.overview, 200)}</h2>
                <div className="movie-genres">
                  <strong>Gêneros:</strong> {genres.join(", ")}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <img
              className="banner-image"
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            />
            <div className="border-image"></div>
            <div className="banner-content">
              <h1 className="banner-title">
                {movie?.title || movie?.name || movie?.original_name}
              </h1>
              <div className="movie-info">
                <div className="movie-vote-banner">
                  {movie.vote_average} pontos
                </div>
                <div className="movie-year">{fistDateTV.getFullYear()}</div>
                {movie?.number_of_seasons > 1 ? (
                  <div className="tv-sesons">
                    {movie?.number_of_seasons} temporadas
                  </div>
                ) : (
                  <div className="tv-sesons">
                    {movie?.number_of_seasons} temporada
                  </div>
                )}
              </div>

              <div className="banner-buttons-container">
                <Link to={`/movie/?id=${movie?.id}&type=tv`}>
                  <button
                    className="banner-button"
                    alt={`/movie/${movie?.id}&type=`}
                  >
                    Assistir
                  </button>
                </Link>
              </div>
              <div className="banner-description">
                <h2>{truncate(movie?.overview, 200)}</h2>
                <div className="movie-genres">
                  <strong>Gêneros:</strong> {genres.join(", ")}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default Banner;
