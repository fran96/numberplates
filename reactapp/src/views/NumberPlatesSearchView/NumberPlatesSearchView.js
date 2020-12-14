import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { CommentsTable, NumberPlatesSearch } from "./components";
import CommentService from "../../services/CommentService";
import { Card, CardActions } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100%",
		margin: 0,
		backgroundColor: "#ffcf4e",
		boxShadow: "none",
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
}));

const NumberPlatesSearchView = () => {
	const classes = useStyles();
	const [Comments, setComments] = useState([]);
	const [keyDown, setKeyDown] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const commentCreated = async () => {
		await filterCommentsByNumberPlate();
	};

	const filterCommentsByNumberPlate = async () => {
		if (searchTerm !== "") {
			let searchTermLower = searchTerm.toLowerCase();
			var response = await CommentService.find(searchTermLower);
			setComments(response.data);
		}
	};
	useEffect(() => {
		filterCommentsByNumberPlate();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm]);

	return (
		<Card className={classes.root}>
			{keyDown ? (
				<CommentsTable
					commentCreated={commentCreated}
					Comments={Comments}
					NumberPlates={searchTerm}
				/>
			) : (
				<div>
					<h1
						style={{
							color: "black",
							textAlign: "center",
							marginTop: "30px",
						}}>
						<b>Enter a license plate number</b>
					</h1>
					<NumberPlatesSearch searchTerm={setSearchTerm} keyDown={setKeyDown} />
					<CardActions>
						<div className={classes.footer}>
							<div>
								<p style={{ color: "black" }}>
									<b>Help</b>
								</p>
							</div>
							<div>
								<p style={{ color: "black" }}>
									<b>Meet the creators</b>
								</p>
							</div>
						</div>
					</CardActions>
				</div>
			)}
		</Card>
	);
};

export default NumberPlatesSearchView;
