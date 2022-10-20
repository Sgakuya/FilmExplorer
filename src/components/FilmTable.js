import React from "react";
import PropTypes from "prop-types";

import FilmContainer from "./FilmContainer";

function FilmTable({ films, setRatingFor }) {
  const keyedFilms = films.map((film) => (
    <FilmContainer key={film.id} {...film} setRatingFor={setRatingFor} />
  ));
  return <div>{keyedFilms}</div>;
}

FilmTable.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
  setRatingFor: PropTypes.func.isRequired,
};

export default FilmTable;
