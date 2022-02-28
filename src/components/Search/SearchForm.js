import "./SearchForm.css";
import React, {useState} from 'react'

const SearchForm = (props) => {
    const [enteredMovie, setEnteredMovie] = useState('');

    const textMovieHandler = (event) =>{
        setEnteredMovie(event.target.value);
    }

    const submitButtonHandler = () =>{
        props.handler(enteredMovie);
    }

  return (
    <div className="searchContainer">
      <h1 >Is It Worth <span className="watchingColor">Watching?</span></h1>
      
      <div className="input-group mb-3">
        
        <input type="text" className="form-control" placeholder="Start by typing a movie/series name.." aria-label="Start by typing a movie/series name.." aria-describedby="button-addon2" onChange={textMovieHandler} />
        <button className="submitButton" type="button" id="button-addon2" onClick={submitButtonHandler}><ion-icon name="search-outline"></ion-icon></button>
        </div>
      
      
    </div>
  );
};

export default SearchForm;
