import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  List,
  MenuItem,
  Select,
  TextField,
  ListItem,
  ListItemText,
} from "@mui/material";
import { create } from "../../redux/slices/create";

const CreateQuestionForm = ({ onSubmit }) => {
  const [questionType, setQuestionType] = useState("multipleChoice");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questions, setQuestions] = useState([]);
  const dispatch = useDispatch();

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
    // Сбросить варианты ответов и правильный ответ при изменении типа вопроса
    setOptions([]);
    setCorrectAnswer("");
  };

  const handleOptionChange = (e, index) => {
    const updatedOptions = [...options];
    updatedOptions[index] = e.target.value;
    setOptions(updatedOptions);
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Создание объекта вопроса
    const question = {
      type: questionType,
      text: questionText,
      options: options,
      correctAnswer: correctAnswer,
    };
    // Добавление вопроса к списку вопросов
    setQuestions([...questions, question]);
    // Сбросить форму
    setQuestionType("multiple_choice");
    setQuestionText("");
    setOptions([]);
    setCorrectAnswer("");
  };
  useEffect(() => {
    dispatch(create(questions));
  }, [questions]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Тип вопроса:
          <Select
            id="demo-simple-select"
            value={questionType}
            onChange={handleQuestionTypeChange}
          >
            <MenuItem value="multiple_choice">Multiple Choice</MenuItem>
            <MenuItem value="true_false">True/False</MenuItem>
            <MenuItem value="short_answer">Short Answer</MenuItem>
          </Select>
        </label>
      </div>
      <div>
        <label>
          Вопрос:
          <TextField
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </label>
      </div>
      {questionType === "multiple_choice" && (
        <div>
          <h4>Варианты ответов:</h4>
          {options.map((option, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name="correctAnswer"
                  value={option}
                  checked={correctAnswer === option}
                  onChange={handleCorrectAnswerChange}
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(e, index)}
                  required
                />
              </label>
            </div>
          ))}
          <Button
            variant="contained"
            onClick={() => setOptions([...options, ""])}
          >
            Добавить вариант ответа
          </Button>
        </div>
      )}
      {questionType === "short_answer" && (
        <div>
          <label>
            Правильный ответ:
            <input
              type="text"
              value={correctAnswer}
              onChange={handleCorrectAnswerChange}
              required
            />
          </label>
        </div>
      )}
      {questionType === "true_false" && (
        <div>
          {/* <Select
            id="demo-simple-select"
            defaultValue=""
            placeholder="Правильный ответ:"
            value={correctAnswer}
            onChange={handleQuestionTypeChange}
          >
            <MenuItem value={"true"}>True</MenuItem>
            <MenuItem value={"false"}>False</MenuItem>
          </Select> */}
          <label>
            Правильный ответ:
            <label>
              <input
                type="radio"
                name="correctAnswer"
                value={true}
                checked={correctAnswer === "true"}
                onChange={handleCorrectAnswerChange}
              />
              <input
                type="text"
                value={true}
                onChange={(e) => handleOptionChange(e, 0)}
                required
              />
            </label>
            <label>
              <input
                type="radio"
                name="correctAnswer"
                value={false}
                checked={correctAnswer === "false"}
                onChange={handleCorrectAnswerChange}
              />
              <input
                type="text"
                value={false}
                onChange={(e) => handleOptionChange(e, 1)}
                required
              />
            </label>
          </label>
        </div>
      )}
      <div>
        <Button variant="outlined" type="submit">
          Создать вопрос
        </Button>
      </div>
      <div>
        <h3>Созданные вопросы:</h3>
        <List>
          {questions.map((q, index) => (
            <ListItem key={index}>
              <ListItemText>
                Тип: {q.type}, Вопрос: {q.text}, Правильный ответ:{" "}
                {q.correctAnswer}{" "}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    </form>
  );
};

export default CreateQuestionForm;
