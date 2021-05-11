import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";

import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";

const ColorlibConnector = withStyles({
	alternativeLabel: {
		top: 22,
	},
	active: {
		backgroundColor: "green",
		"& $line": {
			backgroundColor: "green",
		},
	},
	completed: {
		backgroundColor: "green",
		"& $line": {
			backgroundColor: "green",
		},
	},
	line: {
		height: 3,
		border: 0,
		backgroundColor: "green",
		borderRadius: 12,
	},
})(StepConnector);

const StyledBadge = withStyles(theme => ({
	badge: {
		backgroundColor: "#44b700",
		color: "#44b700",
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		"&::after": {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			borderRadius: "50%",
			animation: "$ripple 1.2s infinite ease-in-out",
			border: "1px solid currentColor",
			content: '""',
		},
	},
	"@keyframes ripple": {
		"0%": {
			transform: "scale(.8)",
			opacity: 1,
		},
		"100%": {
			transform: "scale(2.4)",
			opacity: 0,
		},
	},
}))(Badge);

function GetStepIcon(props) {
	const { icon, active } = props;

	const useColorlibStepIconStyles = makeStyles({
		avatar: {
			color: active ? "#1a941f" : "#fff",
			background: active ? "#fff" : "#1a941f",
			border: active ? "1px solid #1a941f" : "1px solid #fff",
			padding: 30,
		},
		span: {
			fontSize: 14,
		},
		badge: {},
	});

	const classes = useColorlibStepIconStyles();

	return (
		<StyledBadge
			overlap="circle"
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "right",
			}}
			className={classes.badge}
			variant={active ? "dot" : "standard"}
		>
			<Avatar className={classes.avatar}>
				{icon === 1 && <span className={classes.span}> 01 </span>}
				{icon === 2 && <span className={classes.span}> 02 </span>}
				{icon === 3 && <span className={classes.span}> 03 </span>}
				{icon === 4 && <span className={classes.span}> 04 </span>}
			</Avatar>
		</StyledBadge>
	);
}

const useStyles = makeStyles(theme => ({
	root: {
		userSelect: "none",
		outline: "none",
		outlineStyle: "none",
		[theme.breakpoints.up("sm")]: {
			width: "100%",
		},
	},
	step: {
		cursor: "pointer",
		userSelect: "none",
		outline: "none",
		outlineStyle: "none",
	},
}));

export default function HorizontalNonLinearStepper(props) {
	const classes = useStyles();
	const { activeStep, onSelectActiveStep, steps } = props;

	return (
		<div className={classes.root}>
			<Stepper nonLinear activeStep={activeStep}>
				{steps.map(item => (
					<Step
						key={item.id}
						connector={<ColorlibConnector />}
						onClick={() => onSelectActiveStep(item.id)}
					>
						<StepLabel
							className={classes.step}
							active={activeStep === item.id}
							icon={item.id}
							StepIconComponent={GetStepIcon}
						/>
					</Step>
				))}
			</Stepper>
		</div>
	);
}
