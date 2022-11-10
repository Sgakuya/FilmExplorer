import React, { useState, useEffect } from "react";

import FilmTableContainer from "./FilmTableContainer";
import SearchBar from "./SearchBar";
import {getFirestore} from "firebase/firestore";
import {getDocs} from "firebase/firestore";
import {collection} from "firebase/firestore";
import {doc} from "firebase/firestore";
import {updateDoc} from "firebase/firestore";

async function getData(callback){
  const db = getFirestore();
  const docArray = [];
  const collectionSnapshot = await getDocs(collection(db, "films"));
  collectionSnapshot.forEach((document) => {
    docArray.push({ ...document.data(), fsid: document.id }
    );
  });
  callback(docArray);
}

function FilmExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("title");
  const [films, setFilms] = useState([]);

  useEffect(()=>{
    getData(setFilms);
  }, []);  

  // change the rating of a film
  const setRating = async (filmid, rating) => {
    const db = getFirestore();
    const oldFilm = films.find((film) => film.id === filmid);
    const newFilm = { ...oldFilm, rating };  

    await updateDoc(doc(db, "films", newFilm.fsid), {
      rating: rating,
    });
    

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
