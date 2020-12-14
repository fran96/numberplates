import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import CommentService from "../../../../services/CommentService";
import {
	CardHeader,
	List,
	ListItem,
	ListItemText,
	Typography,
	CardContent,
	TextField,
} from "@material-ui/core";

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
		padding: "5px",
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
		marginTop: "60px",
		backgroundColor: "white",
		minHeight: "500px",
		[theme.breakpoints.down("xs")]: {
			marginBottom: "20%",
			marginTop: "20%",
		},
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
	const { className, Comments, NumberPlates, commentCreated, ...rest } = props;
	const classes = useStyles();
	const [writeCommentClicked, setWriteCommentClicked] = useState(false);
	const initialCommentState = {
		comment: "",
		numberPlate: "",
	};
	const [comment, setComment] = useState(initialCommentState);
	const toggleClass = () => {
		setWriteCommentClicked({
			writeCommentClicked: !writeCommentClicked,
		});
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setComment({ ...comment, [name]: value });
	};

	const CreateComment = async (data) => {
		console.log(comment);
		try {
			await CommentService.create(data);
			commentCreated();
		} catch {
			console.log("Error");
		}
	};

	const handleSubmit = (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();

			comment.numberPlate = NumberPlates;
			CreateComment(comment);
		}
	};

	return (
		<CardContent
			style={{
				padding: "0px",
			}}>
			<CardHeader
				className={classes.fixedHeader}
				variant="text"
				title={NumberPlates}
			/>

			<PerfectScrollbar>
				<div className={classes.commentsContainer}>
					{Comments.length > 0 ? (
						<div className={classes.content}>
							<h6 style={{ marginLeft: "5px" }}>
								{Comments.length > 1
									? `${Comments.length} comments`
									: `${Comments.length} comment`}
							</h6>

							<List className={classes.content}>
								{Comments.map((c) => (
									<div key={c.id}>
										<ListItem className={classes.root} alignItems="flex-start">
											<ListItemText primary={c.comment} />
										</ListItem>

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
													{c.timestamp.split("T")[0]}
												</React.Fragment>
											}
										/>
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
