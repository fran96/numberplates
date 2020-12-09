import React, { useState } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import {
	Card,
	CardActions,
	CardContent,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	TablePagination,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {},
	content: {
		padding: 0,
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
}));

const CommentsTable = (props) => {
	const { className, Comments, clientMessage, ...rest } = props;
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
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardContent className={classes.content}>
				<PerfectScrollbar>
					<div className={classes.inner}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Comment</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{Comments.length > 0
									? Comments.map((c) => (
											<TableRow className={classes.tableRow} hover key={c.id}>
												<TableCell style={{ width: "20%" }}>
													<div className={classes.nameContainer}>
														<Typography variant="body1">{c.comment}</Typography>
													</div>
												</TableCell>
											</TableRow>
									  ))
									: null}
							</TableBody>
						</Table>
					</div>
				</PerfectScrollbar>
			</CardContent>
			<CardActions className={classes.actions}>
				<TablePagination
					component="div"
					count={Comments.length}
					onChangePage={handlePageChange}
					onChangeRowsPerPage={handleRowsPerPageChange}
					page={page}
					rowsPerPage={rowsPerPage}
					rowsPerPageOptions={[5, 10, 25]}
				/>
			</CardActions>
		</Card>
	);
};
CommentsTable.propTypes = {
	className: PropTypes.string,
};

export default CommentsTable;
