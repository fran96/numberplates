import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Paper, Input, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";


const useStyles = makeStyles((theme) => ({
	root: {
		borderRadius: "4px",
		alignItems: "center",
		padding: theme.spacing(1),
		display: "flex",
		flexBasis: 420,
	},
	icon: {
		marginRight: theme.spacing(1),
		color: theme.palette.text.secondary,
	},
	input: {
		flexGrow: 1,
		fontSize: "14px",
		lineHeight: "16px",
		letterSpacing: "-0.05px",
	},
}));

const SearchInput = (props) => {
	const { className, onChange, keyDown, style, ...rest } = props;
	const classes = useStyles();
	const numberPlateRegex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
	// /^[+]?\d+([.]\d+)?$/;
	const [errorText, setErrorText] = useState("");
	const search = (event) => {
		if (event.keyCode === 13) {
			console.log(event.target.value);
			if (event.target.value.match(numberPlateRegex)) {
				setErrorText("");

				onChange(event.target.value);
				keyDown(true);
			} else {
				setErrorText("Please enter a valid number plate format.");
			}
		}
	};

	return (
		<Paper {...rest} className={clsx(classes.root, className)} style={style}>
			<SearchIcon className={classes.icon} />
			<TextField
				{...rest}
				onKeyDown={search}
				id="searchInput"
				className={classes.input}
				error
				InputProps={{ disableUnderline: true }}
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

