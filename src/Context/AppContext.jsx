import { createContext, useState } from "react";
import runAi from "../config/gemini";
import { saveToRecents, getRecents } from "../utils/storage";

const AppContext = createContext();

const prompts = {
  travel: [
    "Generate a detailed itinerary for a 7‑day cultural exploration of Kyoto.",
    "Compare budget vs luxury travel options for Paris.",
    "List five sustainable travel practices in Southeast Asia.",
    "Explain seasonal weather impact on Iceland travel planning.",
  ],
  fact: [
    "Share a scientifically accurate marine biology fact.",
    "Give a historical fact about ancient civilizations.",
    "Provide an astronomy fact about planetary motion.",
    "Deliver a psychology fact backed by research.",
  ],
  book: [
    "Summarize key lessons from 'The Lean Startup'.",
    "Extract principles from 'Atomic Habits'.",
    "Overview 'Sapiens' focusing on cultural evolution.",
    "Summarize 'Clean Code' best practices.",
  ],
  code: [
    "Explain async vs sync in JavaScript with examples.",
    "Overview REST API design principles.",
    "Explain database normalization with SQL examples.",
    "Summarize React hooks in state management.",
  ],
};

const getRandomPrompt = (category) => {
  const list = prompts[category];
  return list[Math.floor(Math.random() * list.length)];
};

export const AppProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const [extended, setExtended] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [recents, setRecents] = useState(getRecents());

  // prompt states
  const [prompts] = useState({
    travel: getRandomPrompt("travel"),
    fact: getRandomPrompt("fact"),
    book: getRandomPrompt("book"),
    code: getRandomPrompt("code"),
  });

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);

    const response = await runAi(prompt);
    setResultData(response.data);

    if (response.success) {
      saveToRecents(prompt, response.data);
    }

    setRecents(getRecents());
    setLoading(false);
    setInput("");
  };

  return (
    <AppContext.Provider
      value={{
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent,
        extended,
        setExtended,
        sidebarOpen,
        setSidebarOpen,
        recents,
        setRecents,

        // Prompt States
       prompts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
