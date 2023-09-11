import React, { useEffect, useState } from "react";

import { Post } from "../components/Post";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";

export const FullPost = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const { id } = useParams();
  const userData = useSelector((state) => state.auth.data);
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [showTest, setShowTest] = useState(true);
  const [writeAns, setWriteAns] = useState("");

  useEffect(() => {
    axios
      .get(`/tests/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("Ошибка получения теста");
      });
  });

  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < data.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handelSubmitWrite = () => {
    setWriteAns("");
  };
  const handleSubmitScore = async (score) => {
    try {
      const fields = {
        userId: window.localStorage.id,
        testId: id,
        score: score,
      };
      await axios.post("/scores", fields);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {showTest && (
        <Post
          id={data._id}
          title={data.title}
          imageUrl={`${process.env.REACT_APP_API_URL}${data.imageUrl}`}
          //imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
          user={data.user}
          createdAt={data.createdAt}
          questions={data.questions}
          isEditable={userData?._id === data.user._id}
        >
          <Button
            onClick={() => setShowTest(!showTest)}
            disabled={userData?._id !== data.user._id}
            variant="contained"
          >
            Начать тест
          </Button>
        </Post>
      )}
      {!showTest && (
        <div className="app">
          {showScore ? (
            <div className="score-section">
              You scored {score} out of {data.questions.length}
              <Button
                variant="contained"
                onClick={() => handleSubmitScore(score)}
              >
                Завершить тест
              </Button>
            </div>
          ) : (
            <>
              <div className="question-section">
                <div className="question-count">
                  <span>Question {currentQuestion + 1}</span>/
                  {data.questions.length}
                </div>
                <div className="question-text">
                  {data.questions[currentQuestion].questionText}
                </div>
              </div>
              <div className="answer-section">
                {(() => {
                  if (
                    data.questions[currentQuestion].type === "multiple_choice"
                  ) {
                    return data.questions[currentQuestion].options.map(
                      (answerOption) => (
                        <button
                          className="btn"
                          onClick={() => {
                            if (
                              data.questions[currentQuestion].correctAnswer ===
                              answerOption
                            ) {
                              return handleAnswerOptionClick(true);
                            } else {
                              handleAnswerOptionClick(false);
                            }
                          }}
                        >
                          {answerOption}
                        </button>
                      )
                    );
                  } else if (
                    data.questions[currentQuestion].type === "true_false"
                  ) {
                    return (
                      <>
                        <button
                          className="btn"
                          onClick={() => {
                            if (
                              data.questions[currentQuestion].correctAnswer ===
                              "true"
                            ) {
                              return handleAnswerOptionClick(true);
                            } else {
                              handleAnswerOptionClick(false);
                            }
                          }}
                        >
                          true
                        </button>
                        <button
                          className="btn"
                          onClick={() => {
                            if (
                              data.questions[currentQuestion].correctAnswer ===
                              "false"
                            ) {
                              return handleAnswerOptionClick(true);
                            } else {
                              handleAnswerOptionClick(false);
                            }
                          }}
                        >
                          false
                        </button>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <TextField
                          onChange={(e) => {
                            setWriteAns(e.target.value);
                          }}
                        />
                        <Button
                          onClick={() => {
                            if (
                              data.questions[currentQuestion].correctAnswer ===
                              writeAns
                            ) {
                              handleAnswerOptionClick(true);
                              handelSubmitWrite();
                            } else {
                              handleAnswerOptionClick(false);
                              handelSubmitWrite();
                            }
                          }}
                          variant="contained"
                        >
                          {" "}
                          Submit
                        </Button>
                      </>
                    );
                  }
                })()}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
