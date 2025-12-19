import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPlus,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useEffect, useCallback } from "react";
import AppContext from "../../Context/AppContext";
import {
  getRecents,
  handleDelete,
  getRecentByIndex,
  handleReset,
} from "../../utils/storage";
import { useTheme } from "../../Theme/ThemeContext";
import RecentList from "./RecentList";
import SidebarActions from "./SidebarActions";

const Sidebar = () => {
  const {
    setShowResult,
    setRecentPrompt,
    setResultData,
    extended,
    setExtended,
    sidebarOpen,
    setSidebarOpen,
    recents,
    setRecents,
  } = useContext(AppContext);

  const { theme, toggleTheme } = useTheme();

  const handleClick = useCallback(
    (idx) => {
      const recent = getRecentByIndex(idx);
      if (!recent) return;

      setRecentPrompt(recent.prompt);
      setResultData(recent.result);
      setShowResult(true);
    },
    [setRecentPrompt, setResultData, setShowResult]
  );

  const deleteAndRefresh = useCallback((idx) => {
    handleDelete(idx);
    setRecents(getRecents());
    setShowResult(prev => !prev);
  }, []);

  const resetAndRefresh = useCallback(() => {
    handleReset();
    setRecents([]);
    setShowResult(false);
  }, []);

  const handleNewChat = () => {
    setShowResult(false);
    setExtended(false);
    setSidebarOpen(false);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop
  if (!isMobile) {
    return (
      <div className={`sidebar desktop ${extended ? "open" : ""}`}>
        <div className="top">
          {/* Bars icon only for desktop */}
          <FontAwesomeIcon
            onClick={() => setExtended((prev) => !prev)}
            className="icon"
            icon={faBars}
          />
          <div className="new-chat" onClick={handleNewChat}>
            <FontAwesomeIcon className="icon" icon={faPlus} />
            {extended ? <p>New Chat</p> : null}
          </div>
          <RecentList
            recents={recents}
            onSelect={handleClick}
            onDelete={deleteAndRefresh}
          />
        </div>
        <SidebarActions
          theme={theme}
          toggleTheme={toggleTheme}
          onReset={resetAndRefresh}
          showText={extended}
        />
      </div>
    );
  }

  // Mobile
  return (
    <>
      {/* Backdrop */}
      <div
        className={`sidebar-backdrop ${sidebarOpen ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div className={`sidebar mobile ${sidebarOpen ? "open" : ""}`}>
        <div className="top">
          <div className="close-sidebar-icon">
            <FontAwesomeIcon
              icon={faCircleXmark}
              onClick={() => setSidebarOpen(false)}
            />
          </div>

          <div className="new-chat" onClick={handleNewChat}>
            <FontAwesomeIcon className="icon" icon={faPlus} />
            <p>New Chat</p>
          </div>

          <RecentList
            recents={recents}
            onSelect={handleClick}
            onDelete={deleteAndRefresh}
          />
        </div>

        <SidebarActions
          theme={theme}
          toggleTheme={toggleTheme}
          onReset={resetAndRefresh}
          showText={true}
        />
      </div>
    </>
  );
};

export default Sidebar;
