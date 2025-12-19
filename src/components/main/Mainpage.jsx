import "./Mainpage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from "react";
import AppContext from "../../Context/AppContext";
import user_icon from "../../assets/images/user.png";
import SuggestionCards from "./SuggestionCards";
import ResultDisplay from "./ResultDisplay";
import SearchBox from "./SearchBox";

const Mainpage = () => {
  const {
    input,
    setInput,
    recentPrompt,
    showResult,
    setShowResult,
    loading,
    resultData,
    onSent,
    setSidebarOpen,
    sidebarOpen,
    prompts,
  } = useContext(AppContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="main">
      {/*  Navigation  */}
      <div className="nav">
        <div className="nav-items">
          {isMobile && (
            <FontAwesomeIcon
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="icon"
              icon={faBars}
              aria-label="Toggle sidebar"
            />
          )}
            <p className="logo" onClick={() => setShowResult(false)}>Gemini </p>
        </div>
        <img src={user_icon} alt="User" />
      </div>

      {/*  Main Content */}
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            {!isMobile && (
              <SuggestionCards
                prompts={prompts}
                onSent={onSent}
              />
            )}
          </>
        ) : (
          <ResultDisplay
            recentPrompt={recentPrompt}
            resultData={resultData}
            loading={loading}
            isMobile={isMobile}
            onSent={onSent}
          />
        )}

        {/*  Input Box  */}
        <SearchBox input={input} setInput={setInput} onSent={onSent} />
      </div>
    </div>
  );
};

export default Mainpage;
