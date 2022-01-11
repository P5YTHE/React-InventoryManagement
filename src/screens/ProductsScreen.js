import React from "react";
import { featuredPosts } from "../Data/Data";
import FeaturedPost from "../components/FeaturedPost";
import PostCard from "../components/PostCard";
import ViewAllProducts from "../components/ViewAllProducts";
import {
    Grid
  } from "@material-ui/core";

const ProductsScreen = () => {
  return (
    <>
      <ViewAllProducts/>
    </>
  );
};
export default ProductsScreen;