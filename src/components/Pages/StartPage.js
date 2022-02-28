import SearchForm from "../Search/SearchForm";
import Card from "../Cards/Card";
import "./StartPage.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

let DUMMY_LIST = [];

const StartPage = (props) => {
  const [movieData, setMovieData] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  let myMediaQuery = window.matchMedia('(max-width: 1000px)')

  const getHandler = async (name) => {

    try {
      axios
        .get("https://www.omdbapi.com/?s=" + name + "&apikey=bf994a28")
        .then((res) => {
          if (res.data.Response === "True") {
            setErrorMsg('Select the movie!');
            DUMMY_LIST = res.data.Search;
            setMovieData(DUMMY_LIST);

            if (myMediaQuery.matches){
                document.body.style.setProperty('overflow-y','visible');
            }

            console.log(movieData);
          } else {
            setErrorMsg('Movies not found. Try again!')
            setMovieData([]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("fail");
    }
  };

  const movieSearchHandler = (search) => {
    let searchName = "";
    search = search.trim();
    searchName = search.replace(" ", "+");
    getHandler(searchName);
  };

  useEffect(() =>{
    window.scrollTo(0,0);
  },[props]);

  const movieSelectHandler = (id) => {
    props.movieSelected(id);
  };

  return (
    <div>
      <SearchForm handler={movieSearchHandler} search={movieSearchHandler} />
      <p className="errorMsg">{errorMsg}</p>
      <div className="container">
      <div className="row row-cols-auto">
          <ul className="listContainer">
            {movieData.map((movie) => (
              <Card
                key={movie.imdbID}
                id={movie.imdbID}
                title={movie.Title}
                poster={movie.Poster}
                year={movie.Year}
                cardClick={movieSelectHandler}
              />
            ))}
          </ul>
        
      </div>
      </div>
    </div>
  );
};

export default StartPage;
