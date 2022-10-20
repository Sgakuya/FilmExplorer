import React from "react";
import PropTypes from "prop-types";

import styles from "./FilmSummary.module.css";

import StarRating from "./StarRating";

function FilmSummary(props) {
  return (
    <div className={styles.summary}>
      <h2 className={styles.title} onClick={() => props.onClick(props.id)}>
        {props.title}
      </h2>
      <StarRating
        rating={props.rating}
        setRating={(rating) => {
          props.setRatingFor(props.id, rating);
        }}
      />
      <p className={styles.year}>({props.release_date.slice(0, 4)})</p>
      <p className={styles.score}>TMDB score: {props.vote_average}</p>
    </div>
  );
}

FilmSummary.propTypes = {
  title: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  rating: StarRating.propTypes.rating, // eslint-disable-line react/no-typos
  vote_average: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  setRatingFor: PropTypes.func.isRequired,
};

FilmSummary.defaultProps = {
  rating: StarRating.defaultProps.rating,
};

export default FilmSummary;
