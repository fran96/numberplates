import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import {
	CardHeader,
	TablePagination,
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
	},
	inline: {
		display: "inline",
	},
	content: {
		padding: "5px",
		height: "300px",
	},
	inner: {
		minWidth: 1050,
	},
	nameContainer: {
		display: "flex",
		alignItems: "center",
	},
	avatar: {
		marginRight: theme.spacing(2),
	},
	actions: {
		justifyContent: "flex-end",
	},
	MuiOutlinedInputRoot: {
		borderRadius: "25px !important",
	},
}));

const CssTextField = withStyles({
	root: {
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderRadius: "25px",
			},
		},
	},
})(TextField);

const CommentsTable = (props) => {
	const { className, Comments, NumberPlates, clientMessage, ...rest } = props;
	const classes = useStyles();
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [page, setPage] = useState(0);

	const handlePageChange = (event, page) => {
		setPage(page);
	};

	const handleRowsPerPageChange = (event) => {
		setRowsPerPage(event.target.value);
	};
	return (
		<CardContent
			style={{
				backgroundColor: "white",
				padding: "0px",
			}}>
			<CardHeader
				variant="text"
				style={{ backgroundColor: "yellow" }}
				title={NumberPlates}
			/>
			<div style={{ marginTop: "20px" }}>
				{Comments.length > 0 ? (
					<div className={classes.content}>
						<h6 style={{ marginLeft: "5px" }}>
							{Comments.length > 1
								? `${Comments.length} comments`
								: `${Comments.length} comment`}
						</h6>
						{Comments.map((c) => (
							<List className={classes.content}>
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
							</List>
						))}
					</div>
				) : null}
				<TablePagination
					component="div"
					count={Comments.length}
					onChangePage={handlePageChange}
					onChangeRowsPerPage={handleRowsPerPageChange}
					page={page}
					rowsPerPage={rowsPerPage}
					rowsPerPageOptions={[5, 10, 25]}
				/>
				<CardContent style={{ backgroundColor: "yellow", bottom: "0" }}>
					<CssTextField
						style={{ width: "100%" }}
						variant="outlined"
						label="Write a comment"
					/>
				</CardContent>
			</div>
		</CardContent>
	);
};
CommentsTable.propTypes = {
	className: PropTypes.string,
};

export default CommentsTable;
