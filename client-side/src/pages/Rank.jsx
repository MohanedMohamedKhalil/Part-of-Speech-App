import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRank } from "../api/apiQuiz";
import ScoreContext from "./../context/score";

function Rank() {
  const [rank, setRank] = useState(0);
  const { score, setScore } = useContext(ScoreContext);

  useEffect(() => {
    getUserRank();

    // Reset score value to zero after unmounting
    return () => {
      setScore(0);
    };
  }, []);

  async function getUserRank() {
    // Fetch API to get user rank
    const rank = await getRank(score);
    setRank(rank);
  }

  return (
    <>
      <div className="container text-center  mt-5 p-5 border-top border-bottom border-2 border-dark w-50">
        <h3 className="mb-3 text-success">
          Your Rank : {rank}{" "}
          {rank !== 0 && (
            <i
              className="fa-solid fa-medal"
              style={{
                color:
                  rank >= 70 ? "#e1c614" : rank > 50 ? "#c0c0c0" : "#CD7F32",
              }}
            ></i>
          )}
        </h3>
        <Link to="/" style={{ listStyle: "none !important" }}>
          <button className="btn btn-primary fs-5">
            Try Again <i className="fa-solid fa-rotate-right"></i>
          </button>
        </Link>
      </div>
    </>
  );
}

export default Rank;
