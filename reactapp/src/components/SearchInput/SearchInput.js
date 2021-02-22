import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/styles";
import { Paper, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    borderColour: "black",
    borderStyle: "solid",
    borderWidth: "thick",
    alignItems: "center",
    display: "inline-flex",
    flexBasis: "20%",
  },
}));

const CssTextField = withStyles({
  root: {
    "& .MuiInputBase-input": {
      paddingLeft: "15px",
      fontSize: "40px !important",
      textTransform: "uppercase",
      fontWeight: "bold",
    },
  },
})(TextField);

const SearchInput = (props) => {
  const { className, onChange, keyDown, style, ...rest } = props;
  const classes = useStyles();
  const numberPlateRegex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
  // /^[+]?\d+([.]\d+)?$/;
  const [errorText, setErrorText] = useState("");
  const search = (event) => {
    //  event.target.value = event.target.value.toUpperCase();
    if (event.keyCode === 13) {
      if (event.target.value.match(numberPlateRegex)) {
        setErrorText("");
        onChange(event.target.value.toUpperCase());
        keyDown(true);
      } else {
        setErrorText("This doesn't seem to be a correct number plate.");
      }
    }
  };

  return (
    <Paper {...rest} className={clsx(classes.root, className)} style={style}>
      <img src="images/eumt.svg" />
      <CssTextField
        {...rest}
        onKeyDown={search}
        id="searchInput"
        error
        InputProps={{
          disableUnderline: true,
        }}
        helperText={errorText != "" ? errorText : ""}
      />
    </Paper>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
};

export default SearchInput;
