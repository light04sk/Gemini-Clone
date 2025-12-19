import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import TextareaAutosize from "react-textarea-autosize"

const SearchBox = ({ input, setInput, onSent }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        onSent(input);
        setInput("");
      }
    }
  };

  const handleSendClick = () => {
    if (input.trim()) {
      onSent(input);
      setInput("");
    }
  };

  return (
    <div className="main-bottom">
      <div className="search-box">
        <TextareaAutosize
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Gemini"
          onKeyDown={handleKeyDown}
          minRows={1}
          maxRows={6}
        />
        {input.trim() && (
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="icon"
            onClick={handleSendClick}
            aria-label="Send message"
          />
        )}
      </div>
      <p className="bottom-info">
        Gemini clone may display inaccurate info, including about people, so
        double-check its responses. Your privacy and Gemini Apps
      </p>
    </div>
  );
};

export default SearchBox;
