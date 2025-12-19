import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockRotateLeft,
  faGear,
  faMoon as faMoonSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faMoon as faMoonRegular } from "@fortawesome/free-regular-svg-icons";

const SidebarActions = ({ theme, toggleTheme, onReset, showText }) => {
  return (
    <div className="bottom">
      <div className="bottom-item recent-entry" onClick={toggleTheme}>
        <FontAwesomeIcon
          className="bottom-icon"
          icon={theme === "light" ? faMoonSolid : faMoonRegular}
        />
        {showText && (
          <p>{theme === "light" ? "Dark Theme" : "Light Theme"}</p>
        )}
      </div>

      <div className="bottom-item recent-entry" onClick={onReset}>
        <FontAwesomeIcon className="bottom-icon" icon={faClockRotateLeft} />
        {showText && <p>Reset Recents</p>}
      </div>

      <div className="bottom-item recent-entry">
        <FontAwesomeIcon className="bottom-icon" icon={faGear} />
        {showText && <p>Setting</p>}
      </div>
    </div>
  );
};

export default SidebarActions;
