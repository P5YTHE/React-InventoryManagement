import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";


//Homepage component
export default function Main({ title }) {
  return (
    <>
      <Grid item xs={12} md={8}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Divider />
      </Grid>
    </>
  );
}
