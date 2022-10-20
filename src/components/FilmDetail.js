/* eslint-disable react/prop-types */
import React from "react";
import Image from "next/image";
import PropTypes from "prop-types";

import styles from "./FilmDetail.module.css";

import FilmSummary from "./FilmSummary";

function FilmDetail(props) {
  console.log(props);
  return (
    <div className={styles.detail}>
      <div className={styles.poster}>
        <Image
          alt={props.title}
          src={`http://image.tmdb.org/t/p/w185${props.poster_path}`}
          width={185}
          height={277}
          layout="fixed"
        />
      </div>
      <div>
        <FilmSummary {...props} />
        <hr />
        <p>{props.overview}</p>
      </div>
    </div>
  );
}

// Copy and extend FilmSummary's PropTypes
FilmDetail.propTypes = {
  ...FilmSummary.propTypes,
  overview: PropTypes.string.isRequired,
  poster_path: PropTypes.string,
};

FilmDetail.defaultProps = { ...FilmSummary.defaultProps };

export default FilmDetail;
