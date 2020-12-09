import { makeStyles } from "@material-ui/styles";

export { default } from "./NumberPlatesSearchView";
export const UPDATED = " was successfully updated";
export const ADDED = " was successfully added";
export const DELETED = " was successfully deleted";
export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};
export const useStyles = makeStyles((theme) => ({
	form: {
		display: "flex",
		flexDirection: "column",
		margin: "auto",
		width: "fit-content",
	},
	customFormControl: {
		display: "inline-flex",
		width: "100%",
		postion: "relative",
		flexDirection: "column",
	},
	formControl: {
		marginTop: theme.spacing(2),
		minWidth: 120,
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
	},
	formControlLabel: {
		marginTop: theme.spacing(1),
	},
	allergens: {
		listStyle: "none",
	},
	disabledButton: {
		backgroundColor: "#c20404",
		border: "none",
	},
	appBar: {
		position: "relative",
	},
	imageContainer: {
		height: 200,
		width: 200,
		margin: "0 auto",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	customTableCell: {
		with: "150px",
	},
	image: {
		width: "100%",
	},
	statsItem: {
		display: "flex",
		alignItems: "center",
	},
	statsIcon: {
		color: theme.palette.icon,
		marginRight: theme.spacing(1),
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
	root: {},
	content: {
		padding: 0,
	},
	inner: {
		minWidth: 1050,
	},
	blueButtons: {
		border: "none",
		lineHeight: "23px",
		backgroundColor: "#3f51b5 !important",
	},
	customIcon: {
		marginRight: 3,
		marginBottom: 3,
		width: 20,
		height: 20,
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

export const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

export function getStyles(name, currentProductAllergen, theme) {
	return {
		fontWeight:
			currentProductAllergen.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}
