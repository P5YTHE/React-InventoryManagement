import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { sections } from "../Data/Data";
import { useNavigate } from "react-router";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  paper: {
    background: "#379bff",
    color: "white",
  },
});

//Side Drawer Component used in navigation
export default function TemporaryDrawer({ children }) {
  const classes = useStyles();
  const [state, setState] = React.useState({ left: false });
  const navigate = useNavigate();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />
      <List>
        {sections.map((text, index) => (
          <ListItem button key={text.title} onClick={() => navigate(text.url)}>
            <ListItemIcon>
              {index === 0 ? (
                <AutoAwesomeMotionIcon style={{ color: "white" }} />
              ) : index === 1 ? (
                <BookmarksIcon style={{ color: "white" }} />
              ) : (
                <ManageAccountsIcon style={{ color: "white" }} />
              )}
            </ListItemIcon>
            <ListItemText primary={text.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <Button onClick={toggleDrawer("left", true)}>{children}</Button>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          classes={{ paper: classes.paper }}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
