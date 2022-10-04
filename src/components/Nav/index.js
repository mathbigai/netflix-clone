import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import "./estilos.css";
function Nav() {
  const [show, setShow] = useState(false);
  const [classNameInput, setClassNameInput] = useState(
    "input-search-nav-start"
  );
  const [statusInput, setStatusInput] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShow(window.scrollY > 100);
    });
  }, []);

  const cahngeValorClassNameInput = () => {
    if (!statusInput) {
      setClassNameInput("input-search-nav-end");
      setStatusInput(true);
    } else {
      setClassNameInput("input-search-nav-start");
      setSearch("");
      setStatusInput(false);
    }
  };

  const handleSububmit = (e) => {
    e.preventDefault();

    if (!search) return;
    setClassNameInput("input-search-nav-start");
    setSearch("");
    setStatusInput(false);
    navigate(`/search?q=${search}`);
  };

  return (
    <div className={`nav-container ${show && "nav-container-black"}`}>
      <Link to="/">
        <img
          className="nav-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
        ></img>
      </Link>
      {statusInput ? (
        <form className="search" onSubmit={handleSububmit}>
          <div
            className={`${statusInput ? "search-all-end" : "search-all-start"}`}
          >
            <input
              className={classNameInput}
              type="text"
              placeholder="Buscar"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <div className="button-imput" onClick={cahngeValorClassNameInput}>
              <SearchIcon />
            </div>
            <button
              className={`${
                statusInput ? "button-search-end" : "button-search-start"
              }`}
              type="submit"
            >
              <ManageSearchIcon />
            </button>
          </div>
        </form>
      ) : (
        <form className="search">
          <div
            className={`${statusInput ? "search-all-end" : "search-all-start"}`}
          >
            <input
              className={classNameInput}
              type="text"
              placeholder="Buscar"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <div className="button-imput" onClick={cahngeValorClassNameInput}>
              <SearchIcon />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default Nav;
