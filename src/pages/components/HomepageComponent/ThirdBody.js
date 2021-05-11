import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// import CardActions from "@material-ui/core/CardActions";
import Zoom from "@material-ui/core/Zoom";

import ThirdBodyStepper from "./ThirdBodyStepper";

const steps = [
	{
		id: 1,
		key: "01",
		body: "Select your farmshare and complete reservation form.",
	},

	{
		id: 2,
		key: "02",
		body:
			"Want to do business with us? Reach out to get connected to farmers looking to trade in bulk.",
	},

	{
		id: 3,
		key: "03",
		body: "Consumers are highly considered. Purchase from farmers",
	},

	{
		id: 4,
		key: "04",
		body:
			"Look around and help a farmer to help you also! Lets grow Together... INVEST NOW",
	},
];

const useStyles = makeStyles(theme => ({
	root: {
		height: "inherit",
	},
	first: {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		padding: 120,
		paddingBottom: 5,
		justifyContent: "center",
		alignItems: "center",
		[theme.breakpoints.down("sm")]: {
			padding: 5,
			paddingTop: 40,
		},
	},
	header: {
		textAlign: "center",
	},
	subheader: {
		textAlign: "center",
		padding: "5px 140px",
		[theme.breakpoints.down("sm")]: {
			padding: "5px 30px",
			fontSize: 13,
		},
	},
	stepBodyWrapper: {
		display: "flex",
		flexDirection: "row",
		padding: "5px 150px",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
			padding: "5px 10px",
		},
	},

	stepBody1: {
		flex: 1,
		color: "#44b700",
		fontSize: 25,
		fontWeight: 500,
		padding: "10px 100px",
		[theme.breakpoints.down("sm")]: {
			fontSize: 22,
			textAlign: "center",
			padding: "5px 10px",
			fontWeight: 400,
		},
	},
	stepBody2: {
		flex: 1,
		fontSize: 25,
		fontWeight: 500,
		padding: "10px 100px",
		width: "100%",
		[theme.breakpoints.down("sm")]: {
			display: "none",
		},
	},
}));

export default function ImgMediaCard() {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(1);

	const onSelectActiveStep = id => {
		setActiveStep(id);
	};

	return (
		<div className={classes.root}>
			<div className={classes.first}>
				<Typography gutterBottom variant="h4" className={classes.header}>
					How it works
				</Typography>

				<Typography gutterBottom variant="body1" className={classes.subheader}>
					Take your pick from the supply chain and participate in agribusiness
					projects that are backed up only by Agromart, but also by the best
					land family heritage innovation and overall superior expertise
				</Typography>

				<ThirdBodyStepper
					activeStep={activeStep}
					onSelectActiveStep={onSelectActiveStep}
					steps={steps}
				/>
			</div>

			<div className={classes.stepBodyWrapper}>
				{activeStep === 1 && (
					<ActiveStepBody
						classes={classes}
						checked={true}
						text={steps[1 - 1].body}
					/>
				)}
				{activeStep === 2 && (
					<ActiveStepBody
						classes={classes}
						checked={true}
						text={steps[2 - 1].body}
					/>
				)}
				{activeStep === 3 && (
					<ActiveStepBody
						classes={classes}
						checked={true}
						text={steps[3 - 1].body}
					/>
				)}
				{activeStep === 4 && (
					<ActiveStepBody
						classes={classes}
						checked={true}
						text={steps[4 - 1].body}
					/>
				)}

				<Typography className={classes.stepBody2} gutterBottom>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt .
				</Typography>
			</div>
		</div>
	);
}

const ActiveStepBody = ({ classes, checked, text }) => {
	return (
		<Zoom in={checked} style={{ transitionDelay: "300ms" }}>
			<Typography className={classes.stepBody1} gutterBottom>
				{text}
			</Typography>
		</Zoom>
	);
};
