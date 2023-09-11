import React, { useRef } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import axios from "../../axios";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { Link, useNavigate } from "react-router-dom";
import CreateQuestionForm from "../../components/Questions";
import { useSelector } from "react-redux";

export const AddPost = () => {
  const navigate = useNavigate();
  const question = useSelector((state) => state.crete);
  const [imageUrl, setImageUrl] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [time, setTime] = React.useState("");

  const inputFileRef = useRef(null);
  console.log(question);
  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const validQues = question.create.map((ques) => ({
        type: ques.type,
        questionText: ques.text,
        options: ques.options,
        correctAnswer: ques.correctAnswer,
      }));
      const fields = {
        user: window.localStorage.id,
        title: title,
        description: value,
        time: time,
        imageUrl: imageUrl,
        questionsData: validQues,
      };
      const { data } = await axios.post("/tests", fields);
      const id = data._id;
      navigate(`/tests/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Загрузить превью
      </Button>
      <input
        type="file"
        ref={inputFileRef}
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img
          className={styles.image}
          src={`http://localhost:4444${imageUrl}`}
          alt="Uploaded"
        />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Название теста..."
        fullWidth
      />
      <TextField
        value={time}
        type="number"
        onChange={(e) => setTime(e.target.value)}
        variant="standard"
        placeholder="Время в минутах..."
      />
      <CreateQuestionForm />
      <SimpleMDE
        className={styles.editor}
        value={value}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          Опубликовать
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
