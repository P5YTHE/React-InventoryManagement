import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";


//Homepage content
const useStyles = makeStyles({
  card: {
    display: "flex",
    backgroundColor: "#379bff",
    fontFamily: "Secular One",
    margin: "35px 35px",
    borderSpacing: "35px 35px",
    alignItems: "center",
    justifyContent: "center",
  },
  cardDetails: {
    flex: 1,
    fontFamily: "Secular One",
    alignItems: "center",
    justifyContent: "center",
  },
  cardMedia: {
    width: 100,
    fontFamily: "Secular One",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function FeaturedPost({ post }) {
  const classes = useStyles();

  return (
    <Grid item xs={6}>
      <Card className={classes.card}>
        <CardActionArea component="a" href="#">
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.description}
              </Typography>
            </CardContent>
          </div>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
