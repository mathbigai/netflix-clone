import React, { useEffect, useState } from "react";
import "./estilos.css";
import { Link } from "react-router-dom";
import { getMovies } from "../api/api";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const imageHost = "https://image.tmdb.org/t/p/original/";
function Row({ title, path, isLarge, type }) {
  const [movies, setMovies] = useState([]);
  const [scrollX, setScrollX] = useState(-20);

  const fetchMovies = async (_path) => {
    try {
      const data = await getMovies(_path);
      setMovies(data?.results);
    } catch (error) {
      console.log("fetchMovies error: ", error);
    }
  };

  useEffect(() => {
    fetchMovies(path);
  }, [path]);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRigthArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = movies.length * 187;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 80;
    }
    setScrollX(x);
  };

  const handleLeftArrowLarge = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRigthArrowLarge = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = movies.length * 662;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }
    setScrollX(x);
  };

  return (
    <div className="row-container">
      <h2 className="row-header">{title}</h2>
      <div className="movie-listarea">
        {isLarge ? (
          <div>
            <div className="movie-left-large" onClick={handleLeftArrowLarge}>
              <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>
            <div className="movie-rigth-large" onClick={handleRigthArrowLarge}>
              <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>
          </div>
        ) : (
          <div>
            <div className="movie-left" onClick={handleLeftArrow}>
              <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>
            <div className="movie-rigth" onClick={handleRigthArrow}>
              <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>
          </div>
        )}

        <div
          className="row-cards"
          style={{
            marginLeft: scrollX,
          }}
        >
          {movies?.map((movie) => {
            return (
              <div className="movie-all">
                <Link
                  to={`${
                    type === "all"
                      ? `/movie/?id=${movie?.id}&type=${movie?.media_type}`
                      : `/movie/?id=${movie?.id}&type=${type}`
                  }`}
                >
                  <img
                    className={`${isLarge ? "movie-card-large" : "movie-card"}`}
                    title={movie.name}
                    key={movie.id}
                    src={`${imageHost}${
                      isLarge ? movie.backdrop_path : movie.poster_path
                    }`}
                    alt={movie?.title || movie?.name || movie?.original_name}
                  ></img>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      {movies.length <= 0 && (
        <div className="loading">
          <img src="./img/807 (1).gif" alt="Carregando" />
        </div>
      )}
    </div>
  );
}

export default Row;
