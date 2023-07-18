import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Router from "./router/Router";
import ScoreContext from "./context/score";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [score, setScore] = useState(0);
  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      <BrowserRouter>
        <Router />
        <ToastContainer autoClose={500} draggable={false} theme={"colored"} />
      </BrowserRouter>
    </ScoreContext.Provider>
  );
}

export default App;
