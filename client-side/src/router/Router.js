import { Route, Routes } from "react-router-dom";
import Quiz from "./../pages/Quiz";
import Rank from "./../pages/Rank";
function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/Rank" element={<Rank />} />
      </Routes>
    </>
  );
}

export default Router;
