import "./App.css";
import Nav from "./components/Nav";
import PageMovie from "./pages/PageMovie";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Component } from "react";
import Principal from "./pages/Principal";
import Search from "./pages/Search";
import Cast from "./pages/Cast";
import PageColection from "./pages/PageColection";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Nav />

          <Routes>
            <Route path="/" exact element={<Principal />} />
            <Route path="movie" element={<PageMovie />} />
            <Route path="search" element={<Search />} />
            <Route path="person" element={<Cast />} />
            <Route path="collection" element={<PageColection />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
