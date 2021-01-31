import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { SearchInput } from "../../../../components";

const useStyles = makeStyles((theme) => ({
	root: {},
	row: {
		height: "60px",
		display: "flex",
		alignItems: "center",
		[theme.breakpoints.down("xs")]: {
			width: "50%",
			margin: "0 auto",
		},
	},
	spacer: {
		flexGrow: 1,
	},
	importButton: {
		marginRight: theme.spacing(1),
	},
	exportButton: {
		marginRight: theme.spacing(1),
	},
	searchInput: {
		margin: "0 auto",
	},
}));

const NumberPlatesSearch = (props) => {
	const { className, clientMessage, searchTerm, keyDown, ...rest } = props;

	const classes = useStyles();

	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<div className={classes.row}>
				<span className={classes.spacer} />
			</div>
			<div className={classes.row}>
				<SearchInput
					className={classes.searchInput}
					placeholder=""
					onChange={searchTerm}
					keyDown={keyDown}
				/>
			</div>
		</div>
	);
};

NumberPlatesSearch.propTypes = {
	className: PropTypes.string,
};

export default NumberPlatesSearch;

