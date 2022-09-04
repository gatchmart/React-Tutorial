import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro'

function Footer() {
  return (
    <div className="footer">
      <span className="footer--buttons">
        <FontAwesomeIcon className="footer--buttons--icon" icon={brands('twitter-square')} size="2xl" />
        <FontAwesomeIcon className="footer--buttons--icon" icon={brands('facebook-square')} size="2xl" />
        <FontAwesomeIcon className="footer--buttons--icon" icon={brands('instagram-square')} size="2xl" />
        <FontAwesomeIcon className="footer--buttons--icon" icon={brands('github-square')} size="2xl" />
      </span>
    </div>
  );
}

export default Footer;
