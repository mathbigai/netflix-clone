import React, { useEffect, useState } from "react";
import {
  getCertificate,
  getCredits,
  getLinkTrailer,
  getLogoMedia,
  getMovieInfo,
} from "../api/api";
import { useSearchParams, Link } from "react-router-dom";
import movieTraier from "movie-trailer";
import "./estilos.css";
import ReactPlayer from "react-player";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const imageHost = "https://image.tmdb.org/t/p/original";
const videoHost = "https://www.youtube.com/watch?v=";
function PageMovieC() {
  const [media, setMedia] = useState([]);
  const [tvSesons, setTvSesons] = useState([]);
  const [credits, setCredits] = useState([]);
  const [logo, setLogo] = useState([]);
  const [director, setDirector] = useState([]);
  const [certificate, setCertificate] = useState([]);
  const [colection, setColetion] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [scrollX, setScrollX] = useState(0);
  const [scrollXTV, setScrollXTV] = useState(0);
  const [searchParams] = useSearchParams();
  let id = searchParams.get("id");
  let type = searchParams.get("type");

  const fetchMedia = async () => {
    try {
      window.scrollTo(0, 0);
      let lineDirector = 0;
      let lineCertification = 0;
      const dataInfo = await getMovieInfo(id, type, "language=pt-BR");
      const mediaCredits = await getCredits(id, type);
      const mediaLogo = await getLogoMedia(id, type);
      const mediaCertificate = await getCertificate(id, type);
      setLogo(mediaLogo.logos[0]);
      console.log(mediaCredits);
      if (type === "movie") {
        if (dataInfo.status === "Released") {
          if (mediaCertificate.results.length > 1) {
            for (
              let index = 0;
              index < mediaCertificate.results.length;
              index++
            ) {
              if (mediaCertificate.results[index].iso_3166_1 === "BR") {
                lineCertification = index;
                break;
              } else {
                lineCertification = 0;
              }
            }
          }
        }
      } else {
        if (mediaCertificate.results.length > 1) {
          for (
            let index = 0;
            index < mediaCertificate.results.length;
            index++
          ) {
            if (mediaCertificate.results[index].iso_3166_1 === "BR") {
              lineCertification = index;
              break;
            } else {
              lineCertification = 0;
            }
          }
        }
      }
      if (type === "movie") {
        if (mediaCertificate.results.length > 1) {
          setCertificate(
            mediaCertificate.results[lineCertification].release_dates[0]
          );
        }
      } else {
        if (mediaCertificate.results.length > 1) {
          setCertificate(mediaCertificate.results[lineCertification].rating);
        }
      }

      setCredits(mediaCredits.cast.slice(0, 30));
      if (type !== "tv") {
        if (mediaCredits.crew.length >= 1) {
          for (let index = 0; index < mediaCredits.crew.length; index++) {
            if (mediaCredits.crew[index].job === "Director") {
              lineDirector = index + 1;
              break;
            } else {
              setDirector("Sem diretor definido");
            }
          }
          setDirector(mediaCredits.crew[lineDirector]);
        }
      }

      if (dataInfo.overview === "") {
        const dataInfo = await getMovieInfo(id, type, "");
        setMedia(dataInfo);
        if (dataInfo.belongs_to_collection !== null) {
          setColetion(dataInfo.belongs_to_collection);
        } else {
          setColetion("");
        }
        if (type === "tv") {
          setTvSesons(dataInfo.seasons.reverse());
        }
      } else {
        setMedia(dataInfo);
        if (dataInfo.belongs_to_collection !== null) {
          setColetion(dataInfo.belongs_to_collection);
        } else {
          setColetion("");
        }
        if (type === "tv") {
          setTvSesons(dataInfo.seasons.reverse());
        }
      }
    } catch (error) {
      console.log("Error fetchMedia", error);
    }
  };

  const handleOnClick = async () => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      let lineLinkTeaser = 0;
      const linkTrailer = await getLinkTrailer(id, type);
      for (
        let index = 0;
        linkTrailer.results[index].type != "Trailer";
        index++
      ) {
        lineLinkTeaser = index + 1;
      }
      setTrailerUrl(videoHost + linkTrailer.results[lineLinkTeaser].key);
    }
  };

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRigthArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = credits.length * 187;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 50;
    }
    setScrollX(x);
  };

  const handleLeftArrowTV = () => {
    let x = scrollXTV + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollXTV(x);
  };

  const handleRigthArrowTV = () => {
    let x = scrollXTV - Math.round(window.innerWidth / 2);
    let listW = tvSesons.length * 187;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 50;
    }
    setScrollXTV(x);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  let fistDateMovie = new Date(media?.release_date);
  let fistDateTV = new Date(media?.first_air_date);
  let genres = [];
  for (let i in media?.genres) {
    genres.push(media?.genres[i].name);
  }
  return (
    <div className="media-container">
      <div className="media-banner">
        <div className="media-backdrop-container">
          <img
            className={"media-backdrop"}
            title={media.name}
            src={`${imageHost + media?.backdrop_path} `}
            alt={media?.title || media?.name || media?.original_name}
          ></img>
          <div className="border-image-movie" />
        </div>
        <div className="media-logo-container">
          {logo != undefined && (
            <img
              className={"media-logo"}
              title={media.name}
              src={`${imageHost + logo.file_path} `}
              alt={media?.title || media?.name || media?.original_name}
            ></img>
          )}
        </div>
      </div>
      <div className="all">
        <div className="media-infos-all">
          <div className="media-poster-container">
            <img
              className={"media-poster"}
              title={media.name}
              src={`${
                media?.poster_path === null
                  ? "../img/no-image.jpg"
                  : imageHost + media?.poster_path
              } `}
              alt={media?.title || media?.name || media?.original_name}
            ></img>
          </div>
          <div className="media-infos">
            <div className="media-title">
              {media?.title || media?.name || media?.original_name}
            </div>
            {type === "movie" ? (
              <div className="media-information">
                <div className="media-point">{media?.vote_average} pontos</div>
                {console.log(certificate.certification)}
                {certificate.certification === "L" ? (
                  <img
                    className={"media-certificate-mg"}
                    title={media.name}
                    src={"../img/L.png"}
                    alt={media?.title || media?.name || media?.original_name}
                  ></img>
                ) : certificate.certification === "10" ? (
                  <img
                    className={"media-certificate-mg"}
                    title={media.name}
                    src={"../img/10.png"}
                    alt={media?.title || media?.name || media?.original_name}
                  ></img>
                ) : certificate.certification === "12" ? (
                  <img
                    className={"media-certificate-mg"}
                    title={media.name}
                    src={"../img/12.png"}
                    alt={media?.title || media?.name || media?.original_name}
                  ></img>
                ) : certificate.certification === "14" ? (
                  <img
                    className={"media-certificate-mg"}
                    src={"../img/14.png"}
                  ></img>
                ) : certificate.certification === "16" ? (
                  <img
                    className={"media-certificate-mg"}
                    src={"../img/16.png"}
                  ></img>
                ) : certificate.certification === "18" ? (
                  <img
                    className={"media-certificate-mg"}
                    title={media.name}
                    src={"../img/18.png"}
                    alt={media?.title || media?.name || media?.original_name}
                  ></img>
                ) : (
                  ""
                )}

                <div className="movie-year">{fistDateMovie.getFullYear()}</div>
                <div className="movie-time">{media?.runtime} minutos</div>
              </div>
            ) : (
              <div className="movie-info">
                <div className="movie-vote-banner">
                  {media.vote_average} pontos
                </div>
                {certificate === "L" ? (
                  <img
                    className={"media-certificate-mg"}
                    title={media.name}
                    src={"../img/L.png"}
                    alt={media?.title || media?.name || media?.original_name}
                  ></img>
                ) : certificate === "10" ? (
                  <img
                    className={"media-certificate-mg"}
                    title={media.name}
                    src={"../img/10.png"}
                    alt={media?.title || media?.name || media?.original_name}
                  ></img>
                ) : certificate === "12" ? (
                  <img
                    className={"media-certificate-mg"}
                    title={media.name}
                    src={"../img/12.png"}
                    alt={media?.title || media?.name || media?.original_name}
                  ></img>
                ) : certificate === "14" ? (
                  <img
                    className={"media-certificate-mg"}
                    src={"../img/14.png"}
                  ></img>
                ) : certificate === "16" ? (
                  <img
                    className={"media-certificate-mg"}
                    src={"../img/16.png"}
                  ></img>
                ) : certificate === "18" ? (
                  <img
                    className={"media-certificate-mg"}
                    title={media.name}
                    src={"../img/18.png"}
                    alt={media?.title || media?.name || media?.original_name}
                  ></img>
                ) : (
                  ""
                )}
                <div className="movie-year">{fistDateTV.getFullYear()}</div>
                {media?.number_of_seasons > 1 ? (
                  <div className="tv-sesons">
                    {media?.number_of_seasons} temporadas
                  </div>
                ) : (
                  <div className="tv-sesons">
                    {media?.number_of_seasons} temporada
                  </div>
                )}
              </div>
            )}

            <div className="media-controller-button">
              <button className="media-trailer" onClick={handleOnClick}>
                Trailer
              </button>
              {trailerUrl && (
                <div className="react-player">
                  <ReactPlayer
                    url={trailerUrl}
                    playing={true}
                    width="100%"
                    height="100%"
                  />
                </div>
              )}
            </div>
            <div>
              <div className="media-tagline">{media?.tagline}</div>
              <div className="media-description">{media?.overview}</div>
              <div className="movie-genres">
                <strong>Gêneros:</strong> {genres.join(", ")}
              </div>
            </div>
            {type !== "tv" && (
              <div className="media-director">
                <strong>Diretor(a): </strong>
                {director.name}
              </div>
            )}
          </div>
        </div>
        {type === "movie" && colection !== "" && (
          <div className="cast-container">
            <div className="cast-title">{colection.name}</div>
            <Link to={`/collection/?id=${colection.id}`}>
              <img
                className={"media-card-colection-img"}
                title={colection.name}
                key={colection.id}
                src={`${
                  colection.poster_path === null
                    ? "../img/no-image.jpg"
                    : imageHost + colection.poster_path
                } `}
              ></img>
            </Link>
          </div>
        )}
        {type === "tv" && (
          <div className="cast-container">
            <div className="cast-title">Temporadas</div>
            <div>
              <div className="movie-left" onClick={handleLeftArrowTV}>
                <NavigateBeforeIcon style={{ fontSize: 50 }} />
              </div>
              <div className="movie-rigth" onClick={handleRigthArrowTV}>
                <NavigateNextIcon style={{ fontSize: 50 }} />
              </div>
            </div>
            <div
              className="row-tv-seasons"
              style={{
                marginLeft: scrollXTV,
              }}
            >
              {tvSesons.map((tv) => {
                return (
                  <div>
                    <img
                      className={"media-card-credits-img"}
                      title={tv.name}
                      key={tv.id}
                      src={`${
                        tv.poster_path === null
                          ? "../img/no-image.jpg"
                          : imageHost + tv.poster_path
                      } `}
                    ></img>
                    <div>{tv.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="cast-container">
          <div className="cast-title">Elenco</div>
          <div>
            <div className="movie-left" onClick={handleLeftArrow}>
              <NavigateBeforeIcon style={{ fontSize: 50 }} />
            </div>
            <div className="movie-rigth" onClick={handleRigthArrow}>
              <NavigateNextIcon style={{ fontSize: 50 }} />
            </div>
          </div>
          <div
            className="row-media-cast"
            style={{
              marginLeft: scrollX,
            }}
          >
            {credits.map((credits) => {
              return (
                <div>
                  <Link to={`/person/?id=${credits.id}`}>
                    <img
                      className={"media-card-credits-img"}
                      title={credits.name}
                      key={credits.id}
                      src={`${
                        credits.profile_path === null
                          ? "../img/no-image.jpg"
                          : imageHost + credits?.profile_path
                      } `}
                    ></img>
                  </Link>
                  <div className="credits-name">{credits.name}</div>
                  <div className="credits-character">
                    como {credits.character}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default PageMovieC;
