import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { useHistory } from "react-router-dom";

// Material UI Components
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "../../../components/Link";
import HomeIcon from "@material-ui/icons/Home";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import IconButton from "@material-ui/core/IconButton";

// Customized Components
import SnackBar from "../../../components/SnackBar";
import Copyright from "../../../components/Copyright";
import IsLoadingComp from "../../../components/IsLoading";

// Login Forms
import LoginComponent from "./component/LoginComponent";
import Slide from "@material-ui/core/Slide";

// Authentication Action - REDUX ACTION
import { authorizeUser } from "../../../store/actions/authActions";
import config from "../../../utils/config";

// Material UI Styling
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  container1: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  container2: {
    width: "50%",
    height: "91vh",

    backgroundImage: "url('/img/login.jpg')",
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  mycards: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    margin: 20,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  card: {
    minWidth: 275,
    margin: 40,
  },

  title: {
    fontSize: 14,
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
}));

const Login = props => {
  const classes = useStyles();
  let history = useHistory();

  // CONTROLS THE RESPONSE MESSAGE TO SHOW USERS
  const [isLoading, setIsLoading] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const [msgType, setMsgType] = React.useState("success");
  const [SnackBarOpen, setSnackBarOpen] = React.useState(false);
  const [reset, setReset] = React.useState(false);

  const [redirecting, setRedirecting] = React.useState(false);

  // Function is called to submit form
  const onSubmitForm = async data => {
    setIsLoading(true);

    // MAKE LOGIN REQUEST TO BACKEND USING AXIOS
    const body = { ...data };

    try {
      const KEYS = config();
      const URL = KEYS.API_URL + "/api/user/login";

      const res = await axios.post(URL, body);
      const { email, fullName, id, role, token } = res.data.response;

      setMsg("Succesfully Signed user in!");
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
    <>
      <div className={classes.root}>
        {redirecting && <IsLoadingComp iconSize={50} />}

        <Slide
          direction="right"
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={1000}
        >
          <Container
            component="main"
            maxWidth="lg"
            className={classes.container1}
          >
            {SnackBarOpen && (
              <SnackBar
                autoHideDuration={10000}
                message={msg}
                handleClose={() => setSnackBarOpen(false)}
                type={msgType}
              />
            )}
            <div className={classes.paper}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12}>
                  <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <IconButton>
                      <Link
                        to="/"
                        title={<HomeIcon />}
                        style={{ color: "#556cd6" }}
                      />
                    </IconButton>
                    <Button disabled>Login</Button>
                  </Breadcrumbs>
                </Grid>
              </Grid>

              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <LoginComponent
                onSubmitForm={onSubmitForm}
                reset={reset}
                setReset={setReset}
                isLoading={isLoading}
              />
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        </Slide>
        <div className={classes.container2}> </div>
      </div>
    </>
  );
};

export default connect(null, { authorizeUser })(Login);
