import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { CommentsTable, NumberPlatesSearch } from "./components";
import CommentService from "../../services/CommentService";
const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(3),
	},
	content: {
		marginTop: theme.spacing(2),
	},
}));

const NumberPlatesSearchView = () => {
	const classes = useStyles();
	const [allComments, setAllComments] = useState([]);
	const [Comments, setComments] = useState([]);
	const [NumberPlate, setNumberPlate] = useState([]);
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
		<div className={classes.root}>
			<NumberPlatesSearch
				clientMessage={clientMessage}
				searchTerm={setSearchTerm}
			/>
			{searchTerm !== "" ? (
				<div className={classes.content}>
					<CommentsTable Comments={Comments} clientMessage={clientMessage} />
				</div>
			) : null}
		</div>
	);
};

export default NumberPlatesSearchView;
