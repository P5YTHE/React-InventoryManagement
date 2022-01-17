import React from "react";
import FeaturedPost from "../components/FeaturedPost";
import StepperContainer from "../components/StepperContainer";
import PostCard from "../components/PostCard";
import { featuredPosts } from "../Data/Data";
import { Grid } from "@material-ui/core";

const HomeScreen = () => {
  return (
    <>
      <div style={{ width: "100%" }}>
        <img
          src="https://i.ibb.co/3zxtyzd/Background.png"
          style={{ width: "100%" }}
        ></img>
      </div>

      <FeaturedPost />

      <Grid
        container
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
      >
        {featuredPosts.map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
      </Grid>
      <StepperContainer />
    </>
  );
};
export default HomeScreen;
