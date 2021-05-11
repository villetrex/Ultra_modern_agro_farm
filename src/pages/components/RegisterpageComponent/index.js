import React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

// Material UI Components
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import Zoom from "@material-ui/core/Zoom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Slide from "@material-ui/core/Slide";
import { useTheme } from "@material-ui/core/styles";

// Customized Components
import SnackBar from "../../../components/SnackBar";
import Copyright from "../../../components/Copyright";
import Link from "../../../components/Link";
import IsLoadingComp from "../../../components/IsLoading";

// Registeration Forms
import RegComponent from "./component/RegComponent";

// Authentication Action - REDUX ACTION
import { authorizeUser } from "../../../store/actions/authActions";
import config from "../../../utils/config";

// Material UI Styling
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },

  container: {
    flex: 1,
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: -50,
    },
  },
  halfImg: {
    flex: 1,
    height: "90vh",
    width: "50%",
    backgroundImage: "url('/img/bg_signup.jpg')",
    // /* Add the blur effect */

    // /* Full height */
    // height: 100%;

    // /* Center and scale the image nicely */
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title2: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 25,
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  mycards: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },

  mycards_sm: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },
  card: {
    cursor: "pointer",
    minWidth: 150,
    margin: 20,
    textAlign: "center",
    background: "green",
    [theme.breakpoints.down("sm")]: {
      width: 80,
    },
  },

  title: {
    fontSize: 14,
    color: "white",
  },
  titleB: {
    color: "white",
  },
  backBtn: {
    margin: 40,
    marginLeft: 100,
    float: "left",
    [theme.breakpoints.down("sm")]: {
      margin: 10,
      marginLeft: 10,
      float: "left",
    },
  },

  intro: {
    fontSize: 28,
    width: "100%",
    textAlign: "center",
    padding: 20,
    color: "#a95000",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      fontSize: 22,
    },
  },
  regas: {
    fontSize: 18,
    paddingTop: 20,
    paddingLeft: 10,
  },
}));

const MyCard = props => {
  const { classes, setView, type, checked, zoom } = props;

  return (
    <Zoom
      in={checked}
      style={{
        transitionDelay: checked ? zoom : "0ms",
      }}
      timeout={1300}
    >
      <Card
        elevation={10}
        className={classes.card}
        onClick={() => setView(type.toLowerCase())}
      >
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Register as
          </Typography>

          <Typography variant="h5" component="h2" className={classes.titleB}>
            {type}
          </Typography>
        </CardContent>
      </Card>
    </Zoom>
  );
};

const MyCardSm = props => {
  const { setView, type, checked, zoom } = props;

  return (
    <Zoom
      in={checked}
      style={{
        transitionDelay: checked ? zoom : "0ms",
      }}
      timeout={1300}
    >
      <Button
        style={{
          textAlign: "center",
          width: "100%",
          margin: 5,
          padding: "20px 10px",
        }}
        color="secondary"
        variant="contained"
        onClick={() => setView(type.toLowerCase())}
      >
        {type}
      </Button>
    </Zoom>
  );
};

const items = [
  {
    id: 1,
    type: "Farmer",
    zoom: "0ms",
  },
  {
    id: 2,
    type: "Consumer",
    zoom: "500ms",
  },
  {
    id: 3,
    type: "Retailer",
    zoom: "1000ms",
  },
];

function Register(props) {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const paramType = location.search ? location.search : "first";
  let defaultView = "first";

  if (paramType === "?type=farmer") defaultView = "farmer";
  if (paramType === "?type=consumer") defaultView = "consumer";
  if (paramType === "?type=retailer") defaultView = "retailer";

  const [view, setView] = React.useState(defaultView);

  const [isLoading, setIsLoading] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [msgType, setMsgType] = React.useState("success");
  const [SnackBarOpen, setSnackBarOpen] = React.useState(false);

  const [redirecting, setRedirecting] = React.useState(false);

  const [reset, setReset] = React.useState(false);

  const onSubmit = async (data, type) => {
    setIsLoading(true);

    let userType = "";
    // MAKE REGISTER REQUEST TO BACKEND USING
    if (type === "farmer") userType = "farm";
    if (type === "consumer") userType = "cons";
    if (type === "retailer") userType = "ret";

    const body = {
      ...data,
      userType,
    };

    if (body.password !== body.conPassword) {
      setMsg(`Passwords do not match`);
      setMsgType("error");
      setSnackBarOpen(true);
      return setIsLoading(false);
    }

    // Delete the conPassword key
    delete body.conPassword;

    try {
      const KEYS = config();
      const URL = KEYS.API_URL + "/api/user/register";

      const res = await axios.post(URL, body);
      const { email, fullName, id, role, token } = res.data.response;
      setMsg(`Registeration was successful`);
      setMsgType("success");
      setSnackBarOpen(true);
      setReset(true);
      setIsLoading(false);
      setRedirecting(true);
      setTimeout(() => {
        props.authorizeUser({ email, fullName, id, role, token });
        return history.push("/dashboard");
      }, 3000);
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          console.log(e.response.data);
          setMsg(e.response.data.response);
          setMsgType("error");
          setSnackBarOpen(true);
          return setIsLoading(false);
        }
      }

      setMsg(`Connection Error`);
      setMsgType("error");
      setSnackBarOpen(true);
      return setIsLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      {redirecting && <IsLoadingComp iconSize={50} />}
      <div className={classes.halfImg}> </div>

      <Slide
        direction="left"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={1000}
      >
        <Container component="main" maxWidth="lg" className={classes.container}>
          {SnackBarOpen && (
            <SnackBar
              message={msg}
              handleClose={() => setSnackBarOpen(false)}
              type={msgType}
            />
          )}

          <div className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12}>
                {view === "first" ? (
                  <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <IconButton>
                      <Link
                        to="/"
                        title={<HomeIcon />}
                        style={{
                          color: "#556cd6",
                        }}
                      />
                    </IconButton>
                    <Button disabled>Register</Button>
                  </Breadcrumbs>
                ) : (
                  <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <IconButton>
                      <Link
                        to="/"
                        title={<HomeIcon />}
                        style={{
                          color: "#556cd6",
                        }}
                      />
                    </IconButton>
                    <Button
                      onClick={() => setView("first")}
                      style={{
                        color: "#556cd6",
                      }}
                    >
                      Register
                    </Button>
                    <Button disabled>{view}</Button>
                  </Breadcrumbs>
                )}
              </Grid>
            </Grid>

            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4" className={classes.title2}>
              {view === "first" && "Registration"}
              {view === "farmer" && "Farmer Register"}
              {view === "consumer" && "Consumer Register"}
              {view === "retailer" && "Retailer Register"}
            </Typography>

            {view === "first" && (
              <>
                <div>
                  <Typography className={classes.intro}>
                    Join, Buy, Sell, Invest, and Make Profit Now!
                  </Typography>
                  {matches ? (
                    <>
                      <Typography className={classes.regas}>
                        Register as
                      </Typography>
                      <div className={classes.mycards_sm}>
                        {items.map(item => (
                          <MyCardSm
                            checked={true}
                            key={item.id}
                            zoom={item.zoom}
                            classes={classes}
                            setView={setView}
                            type={item.type}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className={classes.mycards}>
                      {items.map(item => (
                        <MyCard
                          checked={true}
                          key={item.id}
                          zoom={item.zoom}
                          classes={classes}
                          setView={setView}
                          type={item.type}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {view === "farmer" && (
              <RegComponent
                type="Farmer"
                isLoading={isLoading}
                onSubmitForm={onSubmit}
                setView={setView}
                reset={reset}
                setReset={setReset}
              />
            )}

            {view === "consumer" && (
              <RegComponent
                type="Consumer"
                isLoading={isLoading}
                onSubmitForm={onSubmit}
                setView={setView}
                reset={reset}
                setReset={setReset}
              />
            )}

            {view === "retailer" && (
              <RegComponent
                type="Retailer"
                isLoading={isLoading}
                onSubmitForm={onSubmit}
                setView={setView}
                reset={reset}
                setReset={setReset}
              />
            )}
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </Slide>
    </div>
  );
}

export default connect(null, { authorizeUser })(Register);
