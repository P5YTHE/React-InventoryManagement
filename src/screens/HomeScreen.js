import React from "react";
import FeaturedPost from "../components/FeaturedPost";
import {
    Grid
  } from "@material-ui/core";

const HomeScreen = () => {
  return (
    <>
      <FeaturedPost />
        <br />
        <Grid container spacing={4}>          
        </Grid>        
    </>
  );
};
export default HomeScreen;