import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app - Material UI Based
const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#ea9b54",
		},
		secondary: {
			main: "#1a941f",
		},
		error: {
			main: red.A400,
		},
		background: {
			default: "#fff",
		},
	},
});

export default theme;
// main: "#19857b",
