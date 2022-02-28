import "./MoviePage.css";
import PosterCard from "../Cards/PosterCard";
import InfoCard from "../Cards/InfoCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

let MOVIEDATA_ARRAY = [];
let RATINGSDATA_ARRAY = [];
let IIWW_RATING = 0;
let imdbval = 0;
let rotval = 0;
let metvalArray = [];

let imdbR = false;
let rotR = false;
let metR = false;
let newPoster = '';
let infoCardText = "";

const MoviePage = (props) => {
  const [movieData, setMovieData] = useState([]);
  const [ratingsData, setRatingsData] = useState([]);
  const [movErrorMsg, setMovErrorMsg] = useState("");
  const [iiwwStyle, setiiwwStyle] = useState("");
  //const [infoCardText, setInfoCardText] = useState('');

  const getHandler = async () => {
    try {
      axios
        .get("https://www.omdbapi.com/?i=" + props.id + "&apikey=bf994a28")
        .then((res) => {
          MOVIEDATA_ARRAY = res.data;
          setMovieData(MOVIEDATA_ARRAY);
          if (MOVIEDATA_ARRAY.Ratings.length > 0){
            RATINGSDATA_ARRAY = MOVIEDATA_ARRAY.Ratings;
            setRatingsData(RATINGSDATA_ARRAY);
            createIIWWRating(RATINGSDATA_ARRAY, MOVIEDATA_ARRAY.Genre);
          } else {
            setMovErrorMsg("Error: This title is unrated. Try another! ");
          }
        })
        .catch(() => {
            setMovErrorMsg("Error: This title is unrated. Try another! ");
        });
    } catch (error) {
        setMovErrorMsg("Error: This title is unrated. Try another!");
    }
  };

  useEffect(() => {
    IIWW_RATING = 0;
    getHandler();
    window.scrollTo(0,0);
  }, [props]);

  const createIIWWRating = (ratingsData, Genre) => {
    let count = 0;

    while (count < ratingsData.length) {
      if (ratingsData[count].Source === "Internet Movie Database") {
        const imdbvalArray = ratingsData[count].Value.split("/");
        imdbval = imdbvalArray[0] * 10;
        imdbR = true;
      }

      if (ratingsData[count].Source === "Rotten Tomatoes") {
        rotval = ratingsData[count].Value.replace("%", "");
        rotR = true;
      }

      if (ratingsData[count].Source === "Metacritic") {
        metvalArray = ratingsData[count].Value.split("/");
        metR = true;
      }
      count++;
    }

    if (imdbR === true && rotR === false && metR === false) {
      IIWW_RATING = parseInt(IIWW_RATING) + parseInt(imdbval);
    }

    if (imdbR === true && rotR === true && metR === false) {
      IIWW_RATING = parseInt(IIWW_RATING) + parseInt(imdbval * 0.75);
      IIWW_RATING = parseInt(IIWW_RATING) + parseInt(rotval * 0.25);
    }

    if (imdbR === true && rotR === false && metR === true) {
      IIWW_RATING = parseInt(IIWW_RATING) + parseInt(imdbval * 0.75);
      IIWW_RATING = parseInt(IIWW_RATING) + parseInt(metvalArray[0] * 0.25);
    }
    if (imdbR === true && rotR === true && metR === true) {
      IIWW_RATING = parseInt(IIWW_RATING) + parseInt(imdbval * 0.6);
      IIWW_RATING = parseInt(IIWW_RATING) + parseInt(rotval * 0.2);
      IIWW_RATING = parseInt(IIWW_RATING) + parseInt(metvalArray[0] * 0.2);
    }

    if (imdbR === false && rotR === false && metR === false) {
        setMovErrorMsg("Error: This title is unrated. Try another!");
    }

    if (Genre.length > 8) {
      const genreArray = Genre.split(", ");
      let genreIndex = genreArray.indexOf("Horror");
      if (genreIndex !== -1) {
        ourRating(IIWW_RATING, "65");
      }
      genreIndex = genreArray.indexOf("Comedy");
      if (genreIndex !== -1) {
        ourRating(IIWW_RATING, "65");
      } else {
        ourRating(IIWW_RATING, "70");
      }
    } else if (Genre === "Comedy") {
      ourRating(IIWW_RATING, "65");
    } else if (Genre === "Horror") {
      ourRating(IIWW_RATING, "65");
    } else {
      ourRating(IIWW_RATING, "70");
    }
  };

  const ourRating = (rating, ratingMin) => {
    if (rating >= ratingMin) {
      setiiwwStyle(
        <InfoCard
          styles="card text-white bg-success mb-3"
          title="Is It Worth Watching?"
          rating={IIWW_RATING + "/100"}
          text="Yes it is!"
        />
      );
    } else {
      setiiwwStyle(
        <InfoCard
          styles="card text-white bg-danger mb-3"
          title="Is It Worth Watching?"
          rating={IIWW_RATING + "/100"}
          text="No, don't waste your time!"
        />
      );
    }
  };

  return (
    <div className="moviePageContainer">
      <PosterCard
        key={props.id}
        id={props.id}
        title={movieData.Title}
        plot={movieData.Plot}
        poster={movieData.Poster}
        year={movieData.Released}
        runtime={movieData.Runtime}
      />
      <ul className="ratingsContainer">
        {iiwwStyle}
        {ratingsData.map((movie) => (
          <InfoCard
            styles="card text-white bg-dark mb-3"
            title={movie.Source}
            rating={movie.Value}
          />
        ))}
      </ul>

      <button className="backButton" onClick={props.goBack}>
        <ion-icon name="arrow-back-outline"></ion-icon>
      </button>

      <h1>{movErrorMsg}</h1>
    </div>
  );
};

export default MoviePage;
