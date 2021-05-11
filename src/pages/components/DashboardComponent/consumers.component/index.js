import React from "react";
import { connect } from "react-redux";
import AppBar from "../../../../components/layout/AppBar";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import PersonIcon from "@material-ui/icons/Person";
import AddCircleIcon from "@material-ui/icons/AddCircle";

// Materal UI Styling
const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
  },
  header: {
    backgroundImage: "url('/svg/1.svg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "0 -150px",
    width: "100%",
    // backgroundSize: "",
    flexGrow: 1,
    display: "flex",
    flex: 1,
    height: 600,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 1,
    [theme.breakpoints.down("sm")]: {
      height: 500,
      marginBottom: 0,
      backgroundPosition: "0px -180px",
      flexDirection: "column",
    },
  },

  body: {
    flex: 1,
    padding: 30,
    width: "70%",
    marginTop: 50,
    [theme.breakpoints.down("sm")]: {
    width: "90%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginTop: 80,
    },
  },
}));

const checkRole = role => {
  if (role === "farm") return "Farmer";
  if (role === "cons") return "Consumer";
  if (role === "ret") return "Retailer";
  return "User";
};

const Body = props => {
  const classes = useStyles();
  const { email, fullName, role } = props.user;

  return (
    <Paper elevation={10} className={classes.body}>
      <h3>Hello! John</h3>
      <Divider />
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={fullName} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AlternateEmailIcon />
          </ListItemIcon>
          <ListItemText primary="Email" secondary={email} />
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Role" secondary={checkRole(role)} />
        </ListItem>
      </List>
    </Paper>
  );
};

const ThisComponent = props => {
  const classes = useStyles();

  return (
    <Slide direction="down" in={true} mountOnEnter unmountOnExit timeout={500}>
      <div className={classes.root}>
        <div className={classes.header}>
          <AppBar white />
          <Body user={props.user} />
        </div>
      </div>
    </Slide>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(ThisComponent);
