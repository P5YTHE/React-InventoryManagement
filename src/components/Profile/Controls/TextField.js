import { makeStyles } from "@material-ui/core";
import { TextField } from "@mui/material";
import componentStyles from "../componentStyles";

const useStyles = makeStyles(componentStyles);

const TextFieldComp = (props) => {
    const classes = useStyles();
    return(
        <TextField
        variant="standard"
        placeholder="----------------"
        autoComplete="off"
        classes={{root : classes.profileTextField}}
        {...props} />
    )
}
export default TextFieldComp