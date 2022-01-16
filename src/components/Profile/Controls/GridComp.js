import { makeStyles } from "@material-ui/core";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import React from "react";
import themeColors from "../colors";
import componentStyles from "../componentStyles";
import TextFieldComp from "./TextField";

const useStyles = makeStyles(componentStyles);

export const GridComp = ({
  gridSize = "4",
  formLabel,
  name,
  value,
  handleChange,
  textField,
  dropdown,
  radioButton,
  dropdownList,
  radioList,
  ...otherProps
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} lg={gridSize}>
        <FormGroup>
          <FormLabel classes={{ root: classes.formLabelRoot }}>
            {formLabel}
          </FormLabel>
          <FormControl
            variant="filled"
            component={Box}
            width="100%"
            marginBottom="1rem!important"
          >
            {textField && (
              <TextFieldComp
                name={name}
                value={value}
                onChange={handleChange}
                {...otherProps}
              />
            )}

            {dropdown && (
              <FormControl variant="outlined">
                <Select
                  sx={{ width: "20vw" }}
                  name={name}
                  value={value}
                  onChange={handleChange}
                >
                  <MenuItem value="">None</MenuItem>
                  {dropdownList?.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            {radioButton && (
              <RadioGroup row name={name} value={value} onChange={handleChange}>
                {radioList?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    label={item.label}
                    control={<Radio />}
                    style={{
                      color: themeColors.gray[900],
                    }}
                  />
                ))}
              </RadioGroup>
            )}
          </FormControl>
        </FormGroup>
      </Grid>
    </>
  );
};
