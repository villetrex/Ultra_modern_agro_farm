import React from "react";
import MLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const Copyright = ({ color }) => {
	return (
		<Typography
			variant="body2"
			color="textSecondary"
			align="center"
			style={{ color: color ? color : "black" }}
		>
			{"Copyright © "}
			<MLink color="inherit" href=" ">
				Our Team
			</MLink>
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
};
export default Copyright;
