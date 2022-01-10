import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  cover: {
    backgroundImage: `url(https://www.munters.com/globalassets/industries/airt/emea/distribution-warehouse/at_subindustry_page_hero_distribution_warehouse_845x475.jpg)`,
    backgroundPosition: "center",
    padding: "35px 25px",
    height: "150%",
    
    
  },
  title: {
    fontSize: 40,
    fontFamily: "Montserrat",
  },
  textContainer: {
    color: "black",
  },
});

const FeaturedPost = () => {
  const classes = useStyles();

  return (
    <Card className={classes.cover}>
      <CardContent className={classes.textContainer}>
        <Typography className={classes.title} gutterBottom>
          Inventory Management 
        </Typography>
        <Typography variant="h5" component="h2">
         Inventory management system helps to keep track of the product inventory in your warehouse/factory with an interactive Ui and ease of access to the database.
        </Typography>
      </CardContent>
      
    </Card>
  );
};

export default FeaturedPost;
