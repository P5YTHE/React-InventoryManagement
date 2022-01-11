import React from "react";
import { featuredPosts } from "../Data/Data";
import FeaturedPost from "../components/FeaturedPost";
import PostCard from "../components/PostCard";
import {
    Grid
  } from "@material-ui/core";

const HomeScreen = () => {
  return (
    <>
      <FeaturedPost />
        <br />
        <Grid container spacing={4}>
          {featuredPosts.map((post) => (
            <PostCard key={post.title} post={post} />
          ))}
        </Grid>
        
    </>
  );
};
export default HomeScreen;