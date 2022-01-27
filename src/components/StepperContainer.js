import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import Stepper from "./Stepper";
import { Divider } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);


//function for Stepper 
export default function BasicCard() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Card sx={{ minWidth: "100%", backgroundColor: "#F0f3fb" }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 25 }}
            fontWeight={"Bold"}
            color="text.secondary"
            align="center"
            gutterBottom
          >
            How it Works?
          </Typography>
          <Divider varient="middle" />
          <CardContent sx={{ borderSpacing: 10 }}>
            <Stepper />
          </CardContent>
        </CardContent>
      </Card>
    </Grid>
  );
}
