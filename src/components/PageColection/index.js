import React, { useEffect, useState } from "react";
import { getColetion, getPersonBio, getPersonMedia } from "../api/api";
import { useSearchParams, Link } from "react-router-dom";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Moment from "react-moment";
import "moment/locale/pt";
import "./estilos.css";

const imageHost = "https://image.tmdb.org/t/p/original";
function PageColectionC() {
  const [collection, setCollection] = useState([]);
  const [media, setMedia] = useState([]);
  const [scrollX, setScrollX] = useState(0);
  const [searchParams] = useSearchParams();
  let id = searchParams.get("id");
  let birthdayBioDate;
  let deathdayBioDate;
  const fetchMedia = async () => {
    try {
      window.scrollTo(0, 0);

      const collectionInfo = await getColetion(id, "language=pt-BR");
      
      setMedia(collectionInfo);
      setCollection(collectionInfo.parts.sort((a, b) => (a.id > b.id ? 1 : -1)))
      console.log(collectionInfo)
    } catch (error) {
      console.log("Error fetchMedia", error);
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
    let listW = collection.length * 187;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 50;
    }
    setScrollX(x);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

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
            <div>
              <div className="media-tagline">{media?.tagline}</div>
              <div className="media-description">{media?.overview}</div>
              
            </div>
            
          </div>
        </div>
        
        <div className="cast-container">
          <div className="cast-title">Filmes</div>
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
            {collection.map((credits) => {
              return (
                <div>
                  <Link to={`/movie/?id=${credits.id}&type=movie`}>
                    <img
                      className={"media-card-credits-img"}
                      title={credits.name}
                      key={credits.id}
                      src={`${
                        credits.poster_path === null
                          ? "../img/no-image.jpg"
                          : imageHost + credits?.poster_path
                      } `}
                    ></img>
                  </Link>
                  <div className="credits-name">{credits.name}</div>
                  <div className="credits-character">
                    {credits.title}
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
export default PageColectionC;
