import React from "react";
import FeaturedPost from "../components/FeaturedPost";
import StepperContainer from "../components/StepperContainer";
import PostCard from "../components/PostCard";
import { featuredPosts } from "../Data/Data";
import {
    Grid
  } from "@material-ui/core";

const HomeScreen = () => {
  return (
    <>
      <FeaturedPost />
        
        <Grid container 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}>        
        {featuredPosts.map((post) => (
          <PostCard key={post.title} post={post} />
        ))}
        </Grid> 
        <StepperContainer/>       
    </>
  );
};
export default HomeScreen;