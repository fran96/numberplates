import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import CommentService from "../../../../services/CommentService";
import { createBrowserHistory } from "history";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
	CardHeader,
	List,
	ListItem,
	ListItemText,
	Typography,
	CardContent,
	TextField,
	Badge,
	Tooltip,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		borderRadius: "15px",
		backgroundColor: "#e6e4df",
		marginTop: "2%",
	},
	inline: {
		display: "inline",
	},
	content: {
		paddingLeft: "5px",
		paddingTop: "0px",
	},
	listStyle: {
		paddingTop: "4%",
		marginBottom: "6%",
		[theme.breakpoints.down("xs")]: {
			marginBottom: "20%",
			marginTop: "20%",
		},
	},
	commentField: {
		height: "500px",
	},
	fixedHeader: {
		backgroundColor: "#ffcf4e",
		position: "fixed",
		top: "0",
		width: "100%",
		zIndex: "100",
	},
	fixedFooter: {
		backgroundColor: "#ffcf4e",
		bottom: "0",
		position: "fixed",
		width: "100%",
		zIndex: "100",
	},
	commentsContainer: {
		backgroundColor: "white",
		minHeight: "800px",
	},
}));

const CssTextField = withStyles({
	root: {
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderRadius: "25px",
				backgroundColor: "#ffe8a5",
				borderColor: "transparent",
			},
		},

		"& .MuiOutlinedInput-input": {
			zIndex: "999",
		},
	},
})(TextField);

const CommentsTable = (props) => {
	const { className, ...rest } = props;
	const location = useLocation();
	const classes = useStyles();
	const [writeCommentClicked, setWriteCommentClicked] = useState(false);
	const initialCommentState = {
		comment: "",
		numberPlate: "",
	};
	const [comment, setComment] = useState(initialCommentState);
	const [comments, setComments] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const commentCreated = async () => {
		await filterCommentsByNumberPlate();
	};

	let today = new Date();
	const getTimeDifferenceString = (timestamp) => {
		console.log(today);
		var timestampDate = new Date(timestamp);

		console.log(timestampDate);
		var difference = today - timestampDate;
		var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);

		console.log(daysDifference);
		switch (true) {
			case daysDifference == 0:
				return "today";
			case daysDifference <= 7:
				return "this week";
			case daysDifference <= 30:
				return "this month";
			case daysDifference <= 365:
				return "this year";
			default:
				return "a while ago";
		}
	};
	const filterCommentsByNumberPlate = async () => {
		if (searchTerm !== "") {
			let searchTermLower = searchTerm.toLowerCase();
			var response = await CommentService.find(searchTermLower);
			var sortedResponse = response.data.sort(compareNumbers);
			console.log(sortedResponse);
			setComments(response.data);
		}
	};
	useEffect(() => {
		filterCommentsByNumberPlate();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm]);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setComment({ ...comment, [name]: value });
	};

	const handleSubmit = (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();

			comment.numberPlate = searchTerm;
			CreateComment(comment);
		}
	};

	const CreateComment = async (data) => {
		try {
			await CommentService.create(data);
			commentCreated();
			setComment({ ...comment, ["comment"]: "" });
		} catch {
			console.log("Error");
		}
	};

	function compareNumbers(a, b) {
		var aDate = new Date(a.timestamp);
		var bDate = new Date(b.timestamp);
		return bDate - aDate;
	}

	useEffect(() => {
		setSearchTerm(location.state.searchTerm);
	}, [location]);

	const browserHistory = createBrowserHistory();
	return (
		<CardContent
			style={{
				padding: "0px",
			}}>
			<PerfectScrollbar>
				<CardHeader
					className={classes.fixedHeader}
					variant="text"
					title={
						<Badge style={{ fontWeight: "bold" }}>
							<ArrowBackIcon
								style={{ marginRight: "20px" }}
								variant="contained"
								onClick={browserHistory.goBack}></ArrowBackIcon>
							{location.state.searchTerm}
						</Badge>
					}
				/>
				<div className={classes.commentsContainer}>
					{comments.length > 0 ? (
						<div>
							<List className={classes.listStyle}>
								<div>
									<h6 style={{ marginLeft: "5px" }}>
										{comments.length > 1
											? `${comments.length} comments`
											: `${comments.length} comment`}
									</h6>
								</div>

								{comments.map((c) => (
									<div key={c.id}>
										<ListItem className={classes.root} alignItems="flex-start">
											<ListItemText primary={c.comment} />
										</ListItem>

										<Tooltip
											title={c.timestamp.split("T")[0]}
											placement="bottom-start"
											enterDelay={600}>
											<ListItemText
												style={{ marginLeft: "10px" }}
												secondary={
													<React.Fragment>
														<Typography
															component="span"
															variant="body2"
															className={classes.inline}
															color="textPrimary"
														/>
														{getTimeDifferenceString(c.timestamp)}
													</React.Fragment>
												}
											/>
										</Tooltip>
									</div>
								))}
							</List>
						</div>
					) : null}
				</div>
			</PerfectScrollbar>
			<CardContent className={classes.fixedFooter}>
				<CssTextField
					id="comment"
					type="text"
					value={comment.comment}
					name="comment"
					onChange={handleInputChange}
					onKeyDown={handleSubmit}
					className={writeCommentClicked ? classes.commentField : ""}
					style={{ width: "100%" }}
					variant="outlined"
					label="Write a comment"
				/>
			</CardContent>
		</CardContent>
	);
};
CommentsTable.propTypes = {
	className: PropTypes.string,
};

export default CommentsTable;