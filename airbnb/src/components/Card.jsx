
export default function Card(props) {
  var {
    coverImg: img,
    title,
    description,
    price,
    stats,
    location,
    openSpots } = props.item;

  let badgeText
  if (openSpots === 0) {
    badgeText = "SOLD OUT";
  } else if (location === "Online") {
    badgeText = "ONLINE";
  }
  return (
    <div className="card">
      <img className="card-ad-image" src={"./img/" + img} alt="Ad Image" />
      {badgeText && <div className="card-status"><p>{badgeText}</p></div>}
      <span className="card-rating">
        <img src="./img/star.png" />
        {stats.rating}
        <div className="card-rating-subtext">
          ({stats.reviewCount}) • {location}
        </div>
      </span>
      <span className="card-body">{title}</span>
      <span className="card-footer"><strong>From ${price}</strong> / person</span>
    </div>
  )
}