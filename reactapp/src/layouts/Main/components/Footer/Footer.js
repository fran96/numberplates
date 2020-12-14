import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Typography, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {},
	footer: {
		bottom: 0,
		position: "fixed",
	},
}));

const Footer = (props) => {
	const { className, ...rest } = props;

	const classes = useStyles();

	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<Typography variant="body1" className={classes.footer}>
				&copy;{" "}
				<Link component="a" href="https://localhost:3000/" target="_blank">
					Number plates
				</Link>
				. 2020
			</Typography>
		</div>
	);
};

Footer.propTypes = {
	className: PropTypes.string,
};

export default Footer;
