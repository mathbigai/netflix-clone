import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getSearch } from "../api/api";
import ReactPaginate from "react-paginate";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./estilos.css";
const imageHost = "https://image.tmdb.org/t/p/original";
function SearchC() {
  const [searchParams] = useSearchParams();
  const [movie, setMovie] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [actualPage, setActualPage] = useState(0);
  let query = searchParams.get("q");

  const fetchMovies = async () => {
    try {
      window.scrollTo(0, 0);
      const data = await getSearch(query, 1);
      setMovie(data?.results);
      setTotalPage(data?.total_pages);
    } catch (error) {
      console.log("Error fetchRandomMovie", error);
    }
  };

  const selectPage = async (pageNumber) => {
    try {
      window.scrollTo(0, 0);
      const data = await getSearch(query, pageNumber);
      setMovie(data?.results);
      setActualPage(data?.page);
    } catch (error) {
      console.log("Error selectPage", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [query]);

  useEffect(() => {
    if (actualPage > 1) {
      selectPage(actualPage);
    }
  }, [actualPage]);

  return (
    <div className="search-container">
      <div className="search-title">
        Resultados para: <span>{query}</span>
      </div>

      {movie.length > 0 ? (
        <div className="movie-list-search">
          {movie?.map((movie) => {
            return (
              <div className="movie-all-search">
                {movie?.media_type === "person" ? (
                  <Link to={`/person/?id=${movie?.id}`}>
                    <img
                      className={"movie-card-search-no-image"}
                      title={movie.name}
                      key={movie.id}
                      src={`${
                        movie?.profile_path === null
                          ? "./img/no-image.jpg"
                          : imageHost + movie?.profile_path
                      } `}
                      alt={movie?.title || movie?.name || movie?.original_name}
                    ></img>
                  </Link>
                ) : (
                  <Link
                    to={`/movie/?id=${movie?.id}&type=${movie?.media_type}`}
                  >
                    <img
                      className={"movie-card-search-no-image"}
                      title={movie.name}
                      key={movie.id}
                      src={` ${
                        movie?.poster_path === null
                          ? "./img/no-image.jpg"
                          : imageHost + movie?.poster_path
                      }
`}
                      alt={movie?.title || movie?.name || movie?.original_name}
                    ></img>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="search-title">Sem Resultados...</div>
      )}
      {totalPage > 1 && (
        <div className="pagination-container">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<ArrowForwardIosIcon />}
            onPageChange={(e) => selectPage(e.selected + 1)}
            pageRangeDisplayed={5}
            pageCount={totalPage}
            previousLabel={<ArrowBackIosIcon />}
            renderOnZeroPageCount={null}
            className="pagination"
            pageClassName="waves-effect"
            activeClassName="active"
            previousClassName="arrows"
            nextClassName="arrows"
          />
        </div>
      )}
    </div>
  );
}

export default SearchC;
