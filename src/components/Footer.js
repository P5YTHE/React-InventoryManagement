import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#379bff",
    marginTop: theme.spacing(2) ,
    padding: theme.spacing(6, 0),
    //position: "fixed",
    left:"0",
    bottom:"0",
    width:"100%"
  },
}));

export default function Footer({ description, title }) {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          Copyright ©{" "}
          <Link color="inherit" href="https://material-ui.com/">
            Group 4
          </Link>{" "}
          {new Date().getFullYear()}.
        </Typography>
      </Container>
    </footer>
  );
}
