import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

function Info() {
  return (
    <div className="info">
      <img className="info--profile--img" src="./img/profile.png" alt="Profile" />
      <h3>Laura Smith</h3>
      <h4>Frontend Developer</h4>
      <h5>laurasmith.website</h5>
      <div className="info--buttons">
        <button type="button" className="info--buttons--email">
          <FontAwesomeIcon className="info--buttons--icon" icon={solid('envelope')} size="lg" />
          Email
        </button>
        <button type="button" className="info--buttons--linkedin">
          <FontAwesomeIcon className="info--buttons--icon" icon={brands('linkedin')} size="lg" />
          LinkedIn
        </button>
      </div>
    </div>
  );
}

export default Info;
