import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { CommentsTable, NumberPlatesSearch } from "./components";
import CommentService from "../../services/CommentService";
import { Card, CardActions } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(3),
	},
	content: {
		marginTop: theme.spacing(2),
	},
	footer: {
		marginTop: "50px",
		margin: "auto",
		width: "50%",
		textAlign: "center",
	},
}));

const NumberPlatesSearchView = () => {
	const classes = useStyles();
	const [allComments, setAllComments] = useState([]);
	const [Comments, setComments] = useState([]);
	const [keyDown, setKeyDown] = useState(false);
	const [snackBar, setSnackBar] = useState({
		open: false,
		message: "",
	});
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		fetchComments();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const filterCommentsByNumberPlate = async () => {
			if (searchTerm !== "") {
				let searchTermLower = searchTerm.toLowerCase();
				var response = await CommentService.find(searchTermLower);
				setComments(response.data);
			}
		};
		filterCommentsByNumberPlate();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allComments, searchTerm]);

	const fetchComments = async () => {
		var CommentsResponse = await CommentService.getAll();
		setAllComments(CommentsResponse.data);
	};

	const clientMessage = async (message) => {
		setSnackBar({ open: true, message: message });
		await fetchComments();
	};

	return (
		<Card
			style={{
				backgroundColor: "yellow",
				margin: "0 auto",
			}}>
			{keyDown ? (
				<CommentsTable Comments={Comments} NumberPlates={searchTerm} />
			) : (
				<div className={classes.root}>
					<h1 style={{ color: "black", textAlign: "center" }}>
						<b>Enter a license plate number</b>
					</h1>
					<NumberPlatesSearch
						clientMessage={clientMessage}
						searchTerm={setSearchTerm}
						keyDown={setKeyDown}
					/>
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
