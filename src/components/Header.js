import {
  Badge,
  Divider,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import MenuIcon from "@material-ui/icons/Menu";
import { AccountCircle } from "@material-ui/icons";
import SideDrawer from "./SideDrawer";
import { useNavigate } from "react-router";
import Auth from "../Auth/Auth";
const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  tagline: {
    fontSize: 20,
    textTransform: "uppercase",
    justifyContent: "center",
    fontFamily: "Montserrat",
  },
  icon: {
    color: "black",
  },
}));
function Header({ auth }) {
  const classes = useStyles();
  const navigate = useNavigate();
  if(auth.isAuthenticated()){
    console.log(`Access token : ${Auth.getAccessToken()}`)
  }
  return (
    <>
      <Toolbar>
        <SideDrawer>
          <IconButton>
            <MenuIcon className={classes.icon} />
          </IconButton>
        </SideDrawer>
        <Typography variant="h6" className={classes.title} onClick={()=>{navigate("/")}}>
          Inventory Track
        </Typography>        
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          {auth.isAuthenticated() ? (
            <Button onClick={() => auth.logout()}>Logout</Button>
          ) : (
            <>
              <Button>Signup</Button>
              <Button onClick={() => auth.login()}>Login</Button>
            </>
          )}
        </ButtonGroup>
        <IconButton color="inherit" onClick={() => navigate("/profile")}>
          <AccountCircle />
        </IconButton>
      </Toolbar>
      <Divider />
      <Toolbar className={classes.tagline}></Toolbar>
    </>
  );
}
export default Header;