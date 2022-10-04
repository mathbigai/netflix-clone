import React from "react";
import categories from "../api/api";
import "./estilos.css";
import Row from "../Row";

const Home = (props) => {
  return (
    <div className="row-container">
      {categories.map((category) => {
        return (
          <Row
            key={category.name}
            title={category.title}
            path={category.path}
            isLarge={category.isLarge}
            type={category.type}
          />
        );
      })}
    </div>
  );
};

export default Home;
