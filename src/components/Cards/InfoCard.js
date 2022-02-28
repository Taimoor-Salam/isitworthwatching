import "./InfoCard.css"

const InfoCard = (props) =>{
    return(<div className={props.styles}>
    <div className="card-header">{props.title}</div>
    <div className="card-body">
      <h5 className="card-title">{props.rating}</h5>
      {props.text}
      
    </div>
  </div>);
}

export default InfoCard;