import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { NumberPlatesSearch } from "./components";
import { Grid, Paper, CssBaseline, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		boxShadow: "none",
		backgroundColor: "transparent"
	},
	footer: {
		[theme.breakpoints.down("xs")]: {
			textAlign: "left",
			marginLeft: "5px",
		},
		position: "fixed",
		left: 0,
		bottom: 0,
		width: "100%",
		textAlign: "center",
	},
	text: {
		fontFamily: " Gilroy-Medium",
		fontSize: "18px",
		lineHeight: "21px",
		letterSpacing: "0em",
		textAlign: "right"

	}
}));

const NumberPlatesSearchView = () => {
	const classes = useStyles();
	const [keyDown, setKeyDown] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	let history = useHistory();

	useEffect(() => {
		if (keyDown) {
			history.push({
				pathname: "/comments",
				state: {
					searchTerm: searchTerm,
				},
			});
		}
	}, [keyDown]);
	return (
		<div className={classes.root}>

			<React.Fragment>
				<CssBaseline />
				<div style={{
					height: "100px",
					width: "800px",
					left: "nullpx",
					top: "nullpx",
					borderRadius: "0px"
				}}></div>
				<Container maxWidth="sm">
					<Grid container spacing={3} alignItems="center" style={{ backgroundColor: '#FFCF4D;', border: "6px solid black", minHeight: '70vh' }}
						justify="center">
						<Grid item xs={12}>
							<Paper className={classes.paper}><img alt="Zvoga" src="/images/zvoga.png" width="179px" height="46px"></img></Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper className={classes.paper}>
								<div className={classes.text}>The new way to comment on<br />other people's driving!</div></Paper>
						</Grid>
						<Grid item xs={6}>
							<Paper className={classes.paper}><img alt="Zvoga" src="/images/car-accident.png" width="83px" height="58px" /></Paper>
						</Grid>
						<Grid item xs={3}>
							<div className={classes.text}>
								Enter a license plate <br /> number to view and post <br /> comments:
							</div>
						</Grid>
						<Grid item xs={3}>
							<NumberPlatesSearch searchTerm={setSearchTerm} keyDown={setKeyDown} /></Grid>
						<Grid item >
							<div className={classes.footer}>
								<div>
									<p style={{ color: "black" }}>
										<b>Meet the creators</b>
									</p>
								</div>
							</div>
						</Grid>
					</Grid>
				</Container>
			</React.Fragment>

		</div>
	);
};

export default NumberPlatesSearchView;

