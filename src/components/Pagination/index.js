import React from "react";
import "./estilos.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Pagination = (props) => {
  const pageLinks = [];
  for (let index = 1; index <= props.pages; index++) {
    let active = props.currentPage == index ? "active" : "";
    pageLinks.push(
      <li
        className={`waves-effect ${active}`}
        key={index}
        onClick={() => props.selectPage(index)}
      >
        <a href="#!">{index}</a>
      </li>
    );
  }
  return (
    <div className="pagination-container">
      <div className="row">
        <ul className="pagination">
          {props.currentPage > 1 ? (
            <li
              className={`waves-effect`}
              onClick={() => props.selectPage(props.currentPage - 1)}
            >
              <a href="#!">
                <ArrowBackIosIcon />
              </a>
            </li>
          ) : (
            ""
          )}
          {pageLinks}
          {props.currentPage < props.pages ? (
            <li
              className={`waves-effect`}
              onClick={() => props.selectPage(props.currentPage + 1)}
            >
              <a href="#!">
                <ArrowForwardIosIcon />
              </a>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
