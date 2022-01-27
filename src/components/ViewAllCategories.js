import * as React from "react";
import { Button } from "@material-ui/core";
import CategoryGrid from "./CategoryGrid";
import { useNavigate } from "react-router";


//Component for viewing all categories in a list
const ViewAllCategories = () => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        size="small"
        variant="contained"
        color="success"
        onClick={() => {
          navigate("/addcategories");
        }}
      >
        Add Category
      </Button>
      <CategoryGrid />
    </>
  );
};
export default ViewAllCategories;
