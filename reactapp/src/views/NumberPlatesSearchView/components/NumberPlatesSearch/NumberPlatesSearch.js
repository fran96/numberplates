import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { SearchInput } from "../../../../components";

const useStyles = makeStyles((theme) => ({}));

const NumberPlatesSearch = (props) => {
  const {
    className,
    clientMessage,
    searchTerm,
    keyDown,
    style,
    defaultValue,
    isReadonly,
    ...rest
  } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <SearchInput
          style={style}
          defaultValue={defaultValue}
          placeholder="ABC 123"
          onChange={searchTerm}
          keyDown={keyDown}
          isReadonly={isReadonly}
        />
      </div>
    </div>
  );
};

NumberPlatesSearch.propTypes = {
  className: PropTypes.string,
};

export default NumberPlatesSearch;
