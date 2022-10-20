import React, { useState } from "react";


import FilmTableContainer from "./FilmTableContainer";
import SearchBar from "./SearchBar";

import filmData from "../../data/films.json";

function FilmExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("title");
  const [films, setFilms] = useState(filmData);


  // change the rating of a film
  const setRating = (filmid, rating) => {
    const oldFilm = films.find((film) => film.id === filmid);
    const newFilm = { ...oldFilm, rating };

    const alteredFilms = films.map((film) => {
      if (film.id === filmid) {
        return newFilm;
      }
      return film;
    });
    setFilms(alteredFilms);
  };

  const mainContents =
    films.length === 0 ? (
      <h2>Loading...</h2>
    ) : (
      <FilmTableContainer
        searchTerm={searchTerm}
        films={films}
        sortType={sortType}
        setRatingFor={setRating}
      />
    );

  return (
    <div className="FilmExplorer">
      <SearchBar
        searchTerm={searchTerm}
        setTerm={setSearchTerm}
        sortType={sortType}
        setType={setSortType}
      />
      {mainContents}
    </div>
  );
}

export default FilmExplorer;
