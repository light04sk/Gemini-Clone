import Mainpage from "./components/main/Mainpage";
import Sidebar from "./components/sidebar/Sidebar";
import  {AppProvider}  from "./Context/AppContext";

const App = () => {
  return (
    <>
      <AppProvider>
        <Sidebar />
        <Mainpage />
      </AppProvider>
    </>
  );
};

export default App;
