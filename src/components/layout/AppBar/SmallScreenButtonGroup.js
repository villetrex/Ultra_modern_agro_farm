import React from "react";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/MoreVert";

import Link from "../../Link";

const useStyles = makeStyles(theme => ({
  btn: {
    cursor: "pointer",
  },
  btn_2: {
    marginRight: theme.spacing(5),
    fontSize: 12,
  },

  menuButton: {
    marginRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(2),
    },
  },

  smallScreen: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
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

const DropDown = ({
  anchorEl,
  open,
  handleClose,
  isAuthenticated,
  classes,
  onLogout,
}) => {
  return (
    <Menu
      id="fade-menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
    >
      <MenuItem>
        <Link to="/" title="Home" />
      </MenuItem>
      <MenuItem onClick={handleClose}>Categories</MenuItem>
      <MenuItem>
        <Link to="/market" title="Market / Mart" />
      </MenuItem>
      <MenuItem onClick={handleClose}>Contacts</MenuItem>
      {isAuthenticated && (
        <MenuItem>
          <Link to="/dashboard" title="My Dashboard" />
        </MenuItem>
      )}
      {isAuthenticated && (
        <MenuItem className={classes.logoutbtn} onClick={onLogout}>
          Logout
        </MenuItem>
      )}

      {!isAuthenticated && (
        <MenuItem onClick={handleClose}>
          <ButtonGroup size="small">
            <Button variant="contained" color="secondary">
              <Link to="/login" title="Login" />
            </Button>
            <Button variant="contained" color="secondary">
              <Link to="/signup" title="Sign Up" />
            </Button>
          </ButtonGroup>
        </MenuItem>
      )}
    </Menu>
  );
};

const SmallScreenButtonGroup = ({ isAuthenticated, firstName, logout }) => {
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
    <>
      {isAuthenticated ? (
        <Button
          startIcon={<AccountCircleIcon />}
          endIcon={<ExpandMoreIcon />}
          color="inherit"
          variant="outlined"
          aria-controls="simple-menu-233"
          aria-haspopup="true"
          onClick={handleClick}
          size="small"
          className={clsx(classes.btn_2, classes.smallScreen)}
        >
          {firstName}
        </Button>
      ) : (
        <IconButton
          edge="end"
          className={clsx(classes.menuButton, classes.smallScreen)}
          color="inherit"
          aria-label="menu"
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
      )}
      <DropDown
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        handleClose={handleClose}
        isAuthenticated={isAuthenticated}
        classes={classes}
        onLogout={onLogout}
      />
    </>
  );
};

export default SmallScreenButtonGroup;
