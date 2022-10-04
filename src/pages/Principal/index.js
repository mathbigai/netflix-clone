import { Component } from "react";
import Banner from "../../components/Banner";
import Home from "../../components/Home";
import SearchC from "../../components/SearchC";

class Principal extends Component {
  render() {
    return (
      <div className="principal">
        <Banner />
        <Home />
      </div>
    );
  }
}

export default Principal;
