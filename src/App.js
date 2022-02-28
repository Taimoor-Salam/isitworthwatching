import logo from "./logo.svg";
import "./App.css";
import StartPage from "./components/Pages/StartPage";
import MoviePage from "./components/Pages/MoviePage";
import React, { useState, useEffect } from "react";
import AboutPage from "./components/Pages/AboutPage";

let aboutP = false;

const App = () => {
  const [backImg, setBackImg] = useState('background.png');
  let myMediaQuery = window.matchMedia('(max-width: 1000px)');

  const backHandler = () =>{
    setPage(<StartPage movieSelected={pageHandler} />);
    document.body.style.setProperty('overflow-y','hidden');
  }

  const pageHandler = (id) => {
    setPage(<MoviePage goBack={backHandler} id={id} />);
  };

  const aboutButtonHandler = () =>{
    if (aboutP === true){
      setPage(<StartPage movieSelected={pageHandler} />);
      aboutP = false;
    }else{
      setPage(<AboutPage />);
      aboutP = true;
    }
  }

  const [page, setPage] = useState(<StartPage movieSelected={pageHandler} />);

  useEffect(() =>{
    if (myMediaQuery.matches){
      setBackImg('mobile' + backImg);
      if (myMediaQuery.matches){
        let appback = document.querySelector('.App-Back img');
        appback.style.setProperty('width','100vw');
    }
  }
  },[]);

  return (
    <div className="App">
      <div className="App-Back">
        <img src={backImg}></img>
      </div>
      <div className="App-Screen">{page}</div>
      <button className="aboutButton" onClick={aboutButtonHandler}><ion-icon name="ellipsis-horizontal-circle-outline"></ion-icon></button>
    </div>
  );
};

export default App;
