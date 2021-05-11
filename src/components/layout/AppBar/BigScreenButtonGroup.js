import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import HomeIcon from "@material-ui/icons/Home";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Link from "../../Link";

const useStyles = makeStyles(theme => ({
  btn: {
    cursor: "pointer",
  },

  bigScreen: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "inline",
    },
  },

  logoutbtn: {
    color: "#FFF",
    background: "#dc1818",
    margin: "0px 6px",
    textAlign: "center",
    "&:hover": {
      color: "#FFF",
      background: "#ab1111",
    },
  },
}));

const BigScreenButtonGroup = ({ isAuthenticated, firstName, logout }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    logout();
    handleClose();
  };

  return (
    <Grid className={classes.bigScreen}>
      <Button startIcon={<HomeIcon />} className={classes.btn} color="inherit">
        <Link to="#" title=" " />
      </Button>

      <Button className={classes.btn} color="inherit">
        <Link to="#" title="Categories" />
      </Button>

      <Button className={classes.btn} color="inherit">
        <Link to="/market" title="Market / Mart" />
      </Button>

      <Button className={classes.btn} color="inherit">
        <Link to="#" title="Contacts" />
      </Button>

      {isAuthenticated ? (
        <>
          <Button
            startIcon={<AccountCircleIcon />}
            endIcon={<ExpandMoreIcon />}
            color="inherit"
            variant="outlined"
            aria-controls="simple-menu-233"
            aria-haspopup="true"
            size="small"
            onClick={handleClick}
          >
            {firstName}
          </Button>
          <Menu
            id="simple-menu-233"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <Link to="/dashboard" title="My Dashboard" />
            </MenuItem>
            <MenuItem className={classes.logoutbtn} onClick={onLogout}>
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <ButtonGroup size="small" variant={"contained"}>
          <Button
            className={classes.btn}
            color="primary"
            style={{ color: "#fff" }}
          >
            <Link to="/login" title="Login" />
          </Button>
          <Button
            className={classes.btn}
            color="primary"
            style={{ color: "#fff" }}
          >
            <Link to="/signup" title="Sign Up" />
          </Button>
        </ButtonGroup>
      )}
    </Grid>
  );
};

export default BigScreenButtonGroup;
