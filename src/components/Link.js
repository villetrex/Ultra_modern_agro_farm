import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CustomizedLink = props => {
	const { to, title, style } = props;
	return (
		<Link
			to={to}
			style={{
				textDecoration: "none",
				color: "inherit",
				fontFamily: "inherit",
				...style,
			}}
		>
			{title}
		</Link>
	);
};

CustomizedLink.propTypes = {
	to: PropTypes.string.isRequired,
	style: PropTypes.object,
};

export default CustomizedLink;
