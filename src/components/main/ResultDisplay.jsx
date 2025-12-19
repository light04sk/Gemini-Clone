import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import gemini_icon from "../../assets/images/gemini_icon.png";
import ReactMarkdown from "react-markdown";

const ResultDisplay = ({
  recentPrompt,
  resultData,
  loading,
  isMobile,
  onSent,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="result">
      <div className="result-title">
        <div className="copy-action">
          <FontAwesomeIcon
            onClick={() => handleCopy(recentPrompt)}
            className="p-icon"
            icon={faClipboard}
            aria-label="Copy prompt"
          />
          {copied && <span className="copied-text">Copied!</span>}
        </div>
        <FontAwesomeIcon
          onClick={() => onSent(recentPrompt)}
          className="p-icon"
          icon={faArrowsRotate}
          aria-label="Resend prompt"
        />
        <p className="prompt">{recentPrompt}</p>
      </div>

      <div className="result-data">
        <div className={!isMobile ? "result-container" : "mb-result-container"}>
          <img src={gemini_icon} alt="Gemini icon" />
          {loading ? (
            <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>
          ) : (
            <div className={isMobile ? "mb-result-data" : null}>
              <ReactMarkdown>{resultData}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
