import React from 'react';
import { featuredPosts } from '../Data/Data';
import FeaturedPost from '../components/FeaturedPost';
import PostCard from '../components/PostCard';
import ViewAllCategories from '../components/ViewAllCategories';
import {
    Grid
  } from "@material-ui/core";

const CategoryScreen = () => {
  return (
    <>
      <ViewAllCategories/>
    </>
  );
};
export default CategoryScreen;