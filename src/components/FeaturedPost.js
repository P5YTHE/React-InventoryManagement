import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import Divider from "@mui/material/Divider";
import { Grid } from "@mui/material";

const useStyles = makeStyles({
  cover: {
    backgroundImage: `url(https://media.istockphoto.com/photos/warehouse-manager-picture-id1270901360?b=1&k=20&m=1270901360&s=170667a&w=0&h=Wam2slOkUWwKZNA0qcBljjy3b5HbFmB8mWVNMKh5GwE=) `,
    backgroundPosition: "center",

    backgroundPosition: "center",
    padding: "35px 35px",
    margin: "10px 10px",
    whiteSpace: "nowrap",
    height: "20vw",
    width: "100%",

    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",

    borderSpacing: "35px",
  },
  title: {
    fontSize: 50,
    fontFamily: "Secular One",
    fontWeight: "bold",
    color: "#379bff",
  },
  textContainer: {
    color: "white",
    alignContent: "center",
    textShadow: "2px 0px black",
    fontFamily: "Poppins",
    color: "black",
    textShadow: "1px 0px grey",
    width: "100%",
    borderSpacing: "35px",
  },
  innerBlock: {
    backgroundColor: "white",
    fontSize: 50,
    width: "100%",
    fontFamily: "Poppins",
    borderSpacing: "35px",
  },

  newStyle: {
    fontSize: 25,
    fontFamily: "Poppins",
    color: "black",
    textShadow: "1px 0px grey",
  },
  newStyle2: {},
});

//Homepage Component
const FeaturedPost = () => {
  const classes = useStyles();

  return (
    <>
      <Grid>
        <Card className={classes.cover}>
          <CardContent className={classes.newStyle}>
            <Typography className={classes.title} gutterBottom>
              <Card>
                <CardContent className={classes.innerBlock} gutterBottom>
                  <Typography
                    className={classes.title}
                    align="center"
                    gutterBottom
                  >
                    INVENTORY MANAGEMENT
                  </Typography>
                  <Divider variant="string" textAlign="Center"></Divider>
                  <Typography className={classes.newStyle} align="center">
                    Inventory management system helps to keep track of the
                    product inventory
                  </Typography>
                  <Typography className={classes.newStyle} align="center">
                    in your warehouse/factory with an interactive Ui and
                  </Typography>
                  <Typography className={classes.newStyle} align="center">
                    ease of access to the database.
                  </Typography>
                </CardContent>
              </Card>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default FeaturedPost;
