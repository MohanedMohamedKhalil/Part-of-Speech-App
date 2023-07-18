import { useEffect, useState, useContext } from "react";
import ScoreContext from "./../context/score";
import { getWords } from "../api/apiQuiz";
import { ProgressBar } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Quiz() {
  // Using State Hooks to render componenet according to change in states
  const [wordsList, setWordsList] = useState([]);
  const [questionNum, setQuestionNum] = useState(0);
  const pos = ["adjective", "adverb", "noun", "verb"];
  const { score, setScore } = useContext(ScoreContext); // using Context to make scroe global between components
  const [disableAnswers, setDisableAnswers] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getWordsList();
  }, []);

  async function getWordsList() {
    // fetch data from API
    const data = await getWords();
    setWordsList(data);
  }

  const handleClick = (e) => {
    // prevent user from click on same answer twice
    e.preventDefault();

    // check if answer is already disabled
    if (disableAnswers) {
      return;
    }

    // disable answer element
    setDisableAnswers(true);

    // to check if selected pos ===  word's pos
    if (e.target.textContent === wordsList[questionNum]?.pos) {
      // if answer is correct
      setScore((prev) => prev + 10);
      toast.success("✅ Correct Answer ");
    } else {
      // if answer not correct
      toast.error("❌ Wrong Answer ");
    }

    // delay getting the next question by 1.5 seconds
    setTimeout(() => {
      // enable user to answer if next question available
      setDisableAnswers(false);
      // get next question
      setQuestionNum((prev) => prev + 1);
    }, 1500);

    // if user answerd all question , then show his Rank
    if (questionNum === wordsList.length - 1) {
      navigate("/rank");
    }
  };

  return (
    <>
      <div className="container mt-5 w-50">
        <h2 className="text-center">Quiz App</h2>
        <div className=" row quiz mt-5 ">
          <h4 className="text-center">
            Q/{questionNum + 1} : Which category word{" "}
            <strong className="text-capitalize text-primary">
              {wordsList[questionNum]?.word}
            </strong>{" "}
            belongs to ?
          </h4>
          <div className="options mt-5 text-center">
            {pos.map((item) => (
              <p key={item} onClick={handleClick}>
                {item}
              </p>
            ))}
          </div>
          <div className="mt-5 d-flex align-items-center justify-content-start  ">
            <span
              className="btn btn-success me-2 w-25"
              style={{ cursor: "auto" }}
            >
              SCORE : {score}
            </span>
            <ProgressBar
              animated
              style={{ height: "39px" }}
              variant="info"
              className="progressBar"
              now={(questionNum / wordsList.length) * 100}
              label={(questionNum / wordsList.length) * 100 + "%"}
            ></ProgressBar>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quiz;
