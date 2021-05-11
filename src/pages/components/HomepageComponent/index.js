import React from "react";
import { connect } from "react-redux";

// Materal UI Components
// import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Zoom from "@material-ui/core/Zoom";

// Custom Componennts
import AppBar from "../../../components/layout/AppBar";
import Link from "../../../components/Link";
import Cards from "./Cards";
import ThirdBody from "./ThirdBody";
import Footer from "./Footer";

// Materal UI Styling
const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
  },
  header: {
    backgroundImage: "url('/svg/leafs_bg_header.svg')",
    backgroundRepeat: "no-repeat",
    // backgroundSize: "",
    flexGrow: 1,
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 1,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 0,
      backgroundPosition: "10px -40px",
      flexDirection: "column",
    },
  },
  headerTextWrapper: {
    flexGrow: 1,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    marginTop: 70,
    paddingLeft: 70,
    paddingRight: 50,
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      marginTop: 70,
      padding: 0,
      paddingLeft: 10,
      paddingRight: 10,
    },
  },
  headerText: {
    fontSize: 50,
    [theme.breakpoints.down("sm")]: {
      fontSize: 30,
      textAlign: "center",
    },
  },
  headerTextSub: {
    padding: 5,
  },

  headerimgWrapper: {
    flexGrow: 1,
    display: "flex",
    flex: 1,
    flexDirection: "center",
    justifyContent: "center",
    marginTop: 80,
    marginBottom: 60,

    [theme.breakpoints.down("sm")]: {
      marginBottom: 20,
      marginTop: 40,
    },
  },
  headerimg: {
    width: "100%",
  },
  btn: {
    borderRadius: 30,
    padding: "10px 30px",
    color: "#FFF",
    marginTop: 5,
    [theme.breakpoints.down("sm")]: {
      marginTop: 20,
    },
  },

  secondBody: {
    background: "#fff",
    // background: "#156d19",
    // backgroundImage: "url('/svg/cards_bg.svg')",
    // backgroundPosition: "0 0",
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "cover",

    flexGrow: 1,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 1,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      paddingTop: 20,
    },
  },

  secondBodyimgWrapper: {
    flex: 1,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  secondBodyTwo: {
    background: "#156d19",
    width: "100%",
    paddingBottom: 1,
  },

  secondBodyImgTop: {
    marginBottom: -20,
    [theme.breakpoints.down("sm")]: {
      marginBottom: -1,
    },
  },

  secondBodyImgBtm: {
    marginTop: -20,
  },
  thirdBody: {
    height: 578,
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      padding: "30px 0",
    },
  },
  Footer: {},
}));

const Home = props => {
  const classes = useStyles();
  const { isAuthenticated } = props;

  return (
    <div className={classes.root}>
      <Slide
        direction="left"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={1000}
      >
        <div>
          <AppBar />
        </div>
      </Slide>
      <div className={classes.header}>
        <Slide
          direction="right"
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={1000}
        >
          <Box className={classes.headerTextWrapper}>
            <Typography className={classes.headerText} align="left">
              Welcome to Agromart
            </Typography>

            <Typography className={classes.headerTextSub} variant="caption">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco.
            </Typography>
            <Button color="primary" variant="contained" className={classes.btn}>
              {isAuthenticated ? (
                <Link to="/dashboard" title="GO TO MY DASHBOARD" />
              ) : (
                <Link to="/signup" title="GET STARTED" />
              )}
            </Button>
          </Box>
        </Slide>
        <Box className={classes.headerimgWrapper}>
          <Zoom in={true} style={{ transitionDelay: "500ms" }} timeout={1100}>
            <img
              src="./svg/header.svg"
              className={classes.headerimg}
              alt="farmers"
            />
          </Zoom>
        </Box>
      </div>

      <div className={classes.secondBody}>
        <img
          src="/svg/cards_bg_top.svg"
          alt="svg"
          className={classes.secondBodyImgTop}
        />
        <div className={classes.secondBodyTwo}>
          <Cards />
        </div>
      </div>

      <div className={classes.thirdBody}>
        <ThirdBody />
      </div>

      <div className={classes.Footer}>
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
