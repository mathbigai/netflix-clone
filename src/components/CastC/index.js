import React, { useEffect, useState } from "react";
import { getPersonBio, getPersonMedia } from "../api/api";
import { useSearchParams, Link } from "react-router-dom";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Moment from "react-moment";
import "moment/locale/pt";
import "./estilos.css";

const imageHost = "https://image.tmdb.org/t/p/original";
function PageCastC() {
  const [cast, setCast] = useState([]);
  const [bio, setBio] = useState([]);
  const [scrollX, setScrollX] = useState(0);
  const [searchParams] = useSearchParams();
  let id = searchParams.get("id");
  let birthdayBioDate;
  let deathdayBioDate;
  const fetchMedia = async () => {
    try {
      window.scrollTo(0, 0);

      const dataInfo = await getPersonMedia(id);
      const bioInfo = await getPersonBio(id, "language=pt-BR");
      if (bioInfo.biography === "") {
        const bioInfo = await getPersonBio(id, "");
        setBio(bioInfo);
      } else {
        setBio(bioInfo);
      }
      setCast(dataInfo.cast);
      setCast(
        dataInfo.cast
          .sort((a, b) => (a.popularity < b.popularity ? 1 : -1))
          .slice(0, 30)
      );
    } catch (error) {
      console.log("Error fetchMedia", error);
    }
  };

  birthdayBioDate = new Date(bio.birthday);
  birthdayBioDate.setDate(birthdayBioDate.getDate() + 1);

  deathdayBioDate = new Date(bio.deathday);
  deathdayBioDate.setDate(deathdayBioDate.getDate() + 1);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRigthArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = cast.length * 187;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 50;
    }
    setScrollX(x);
  };

  function truncate(str, n) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }

  useEffect(() => {
    fetchMedia();
  }, []);

  let personBirthday = new Date(bio.birthday);
  return (
    <div className="person-container">
      <div className="person-info">
        <div className="person-img">
          <img
            className={"profile-path"}
            title={bio.name}
            src={`${
              bio.profile_path === null
                ? "../img/no-image.jpg"
                : imageHost + bio?.profile_path
            } `}
            alt={bio?.title || bio?.name || bio?.original_name}
          ></img>
        </div>
        <div className="person-information">
          <div className="person-name">{bio.name}</div>
          <div className="person-live">
            <div className="person-birthday">
              {"Nasceu em "}
              <Moment format="LL">{birthdayBioDate}</Moment>
            </div>
            {bio.deathday === null ? (
              ""
            ) : (
              <div className="separe-live">{"."}</div>
            )}

            <div className="person-deathday">
              {bio.deathday === null ? (
                ""
              ) : (
                <div>
                  {"Morreu em "}
                  <Moment format="LL">{deathdayBioDate}</Moment>
                </div>
              )}
            </div>
          </div>
          <div className="person-biography">{truncate(bio.biography, 1800)}</div>
        </div>
      </div>
      <div className="cast-container">
        <div className="cast-title">Principais Trabalhos</div>
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
          {cast.map((credits) => {
            return (
              <div>
                <Link
                  to={`/movie/?id=${credits.id}&type=${credits.media_type}`}
                >
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
                <div className="credits-character">
                  como {credits.character}
                </div>
              </div>
            );
          })}
        </div>
        <div className="person-works-crew"></div>
      </div>
    </div>
  );
}
export default PageCastC;
