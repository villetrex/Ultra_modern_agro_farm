import React from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";

import Link from "../../Link";
import { logout } from "../../../store/actions/authActions";

import BigScreenButtonGroup from "./BigScreenButtonGroup";
import SmallScreenButtonGroup from "./SmallScreenButtonGroup";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },

  toolbar: {
    background: "inherit",
    height: "inherit",
    padding: "5px 42px",
    [theme.breakpoints.down("md")]: {
      padding: "10px 0",
    },
  },

  title: {
    flexGrow: 1,
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      padding: "0 20px",
    },
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;

  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  if (props.page)
    return React.cloneElement(children, {
      elevation: 3,
      style: { color: "#FFF", background: "rgba(18, 107, 22, 0.8)" },
    });

  if (props.white) {
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,

      style: trigger
        ? { color: "#FFF", background: "rgba(18, 107, 22, 0.88)" }
        : { color: "#FFF", background: "#ffffff00" },
      // color: trigger ? "secondary" : "transparent",
    });
  }

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,

    style: trigger
      ? { color: "#FFF", background: "rgba(18, 107, 22, 0.88)" }
      : { color: "#000000DE", background: "#ffffff00" },
    // color: trigger ? "secondary" : "transparent",
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const ElevateAppBar = props => {
  const classes = useStyles();
  const { isAuthenticated, user } = props;

  const firstName = user.fullName ? user.fullName.split(" ")[0] : "";

  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar className={classes.appbar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.title}>
              <Link to="/" title="Agromart App" />
            </Typography>

            <BigScreenButtonGroup
              isAuthenticated={isAuthenticated}
              firstName={firstName}
              logout={props.logout}
            />

            <SmallScreenButtonGroup
              isAuthenticated={isAuthenticated}
              firstName={firstName}
              logout={props.logout}
            />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(ElevateAppBar);
