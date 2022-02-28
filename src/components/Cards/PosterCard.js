import "./PosterCard.css";
import React, { useEffect, useState } from 'react';

const PosterCard = (props) => {
    const [updatedPoster, setUpdatedPoster] = useState('');

    const posterCheck = (thePoster) =>{
        if (thePoster === 'N/A'){
            setUpdatedPoster("NOPOSTER.png");
        } else {
            setUpdatedPoster(thePoster);
        }
    }

     useEffect(() => {
         posterCheck(props.poster);
     },[props])

  return (
    <div className="posterContainer">
      <div class="card bg-dark text-white">
        <img src={updatedPoster} class="card-img" alt="..." />
        <div className="card-img-overlay">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.plot}</p>
          <p className="card-text">{props.year} | {props.runtime}</p>
        </div>
      </div>
    </div>
  );
};

export default PosterCard;
