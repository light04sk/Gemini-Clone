import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faLightbulb,
  faMessage,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

const SuggestionCards = ({ prompts, onSent }) => {
  const cardData = [
    { prompt: prompts.travel, icon: faCompass },
    { prompt: prompts.fact, icon: faLightbulb },
    { prompt: prompts.book, icon: faMessage },
    { prompt: prompts.code, icon: faCode },
  ];

  return (
    <div className="cards">
      {cardData.map(({ prompt, icon }, index) => (
        <div className="card" key={index} onClick={() => onSent(prompt)}>
          <p>{prompt}</p>
          <FontAwesomeIcon className="icon" icon={icon} />
        </div>
      ))}
    </div>
  );
};

export default SuggestionCards;
