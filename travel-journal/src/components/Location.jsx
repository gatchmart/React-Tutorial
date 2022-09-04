export default function Location(props) {
  var upper = props.location.toUpperCase();
  return (
    <div className="location">
      <img className="location--image" src={props.imageUrl} />
      <div className="location--content">
        <div className="location--header">
          <img src="./img/location.png" />
          <span>{upper}</span>
          <a href={props.googleMapsUrl} target="_blank">View on Google Maps</a>
        </div>
        <h1>{props.title}</h1>
        <h4>{props.startDate} - {props.endDate}</h4>
        <p>
          {props.description}
        </p>
      </div>

    </div>
  )
}