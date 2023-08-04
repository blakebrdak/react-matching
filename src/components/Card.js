import React from "react";

import "../css/Card.css";
import bigten from "../big10.png"

export default function Card(props) {

  const flipCard = () => {
    props.handleFlip(props.id);
  };

  
  return (
    <button
      onClick={flipCard}
      className={`flip-card ${props.flipped ? "clicked" : ""} ${props.invisibleArr.includes(parseInt(props.id)) ? "hidden" : ""}`}
      tabIndex={-1}
    >
      <div className="card-inner" tabIndex={-1}>
        <div className="card-front" tabIndex={-1}>
          <img alt='big 10 logo' className="b1glogo" src={bigten} />
        </div>
        <div className="card-back" tabIndex={-1}>
          <img alt='school logo' className='icon' src={props.source}/>
        </div>
      </div>
    </button>
  );
}
