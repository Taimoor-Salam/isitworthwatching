import "./Card.css";
import React, { useState, useEffect } from 'react'

const Card = (props) => {
    const [poster,setPoster] = useState(props.poster);

    const posterCheck = () =>{
        if (poster === 'N/A'){
            setPoster("NOPOSTER.png");
        }
    }

    useEffect(() => {
        posterCheck();
    },[props])

    const cardClickHandler = () =>{
        props.cardClick(props.id);
    }

  return (
    <div className="card text-white bg-dark mb-3" onClick={cardClickHandler}>
      <img
        src={poster}
        className="card-img-top"
      ></img>
      <div className="card-body">
        <p className="card-text">{props.title} ({props.year})</p>
      </div>
    </div>
  );
};

export default Card;
