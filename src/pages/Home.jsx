import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { useDispatch, useSelector } from "react-redux";
import { fetchScores, fetchTests } from "../redux/slices/tests";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state)=>state.auth.data)
  const { tests,scores } = useSelector((state) => state.tests);

  const isTestsLoading = tests.status === "loading";
  const isScoresLoading = scores.status === "loading";
  
  useEffect(() => {
    dispatch(fetchTests());
    dispatch(fetchScores());
  }, []);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Тесты" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isTestsLoading ? [...Array(5)] : tests.items).map((obj, index) =>
            isTestsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                _id={obj._id}
                title={obj.title}
                imageUrl={`http://localhost:4444${obj.imageUrl}`}
                //imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                user={obj.user}
                createdAt={obj.createdAt}
                questions={obj.questions}
                isEditable={userData?._id===obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={scores.items}
            isLoading={isScoresLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
