import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Link from "../../../../components/Link";

import BigScreenButtonGroup from "../../../../components/layout/AppBar/BigScreenButtonGroup";
import SmallScreenButtonGroup from "../../../../components/layout/AppBar/SmallScreenButtonGroup";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    color: "#FFF",
    background: "rgba(18, 107, 22, 0.88)",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbarX: theme.mixins.toolbar,
  toolbarXResponsive: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 20,

    [theme.breakpoints.down("sm")]: {
      marginTop: 60,
    },
  },

  titleHeader: {
    flexGrow: 1,
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      padding: "0",
      paddingTop: 10,
    },
  },

  title: {
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      fontSize: 40,
    },
  },
  text: {
    textAlign: "left",
    fontSize: 25,
    color: "gray",
    [theme.breakpoints.down("sm")]: {
      fontSize: 23,
    },
  },

  btn1: {
    margin: "50px 100px",
    [theme.breakpoints.down("sm")]: {
      margin: 20,
    },
  },
  btn2: {
    margin: 20,
    color: "white",
    background: "red",
  },
  toolbar: {
    background: "inherit",
    height: "inherit",
    padding: "5px 42px",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      padding: "10px 0",
      paddingLeft: 10,
    },
  },
  toolbarA: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },
  active: {
    color: "rgba(18, 107, 22, 0.88)",
  },
}));

function DashboardWrapper(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const { isAuthenticated, user, active, setActive } = props;

  const firstName = user.fullName ? user.fullName.split(" ")[0] : "";

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbarX} />
      <Divider />
      <List>
        {["Home", "My Farms"].map((text, index) => (
          <ListItem
            selected={active === text}
            button
            key={Math.random() * Math.random()}
            onClick={() => setActive(text)}
          >
            <ListItemIcon className={active === text ? classes.active : null}>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  if (!isAuthenticated) return <h1>YOU NEED TO LOGIN IN TO VIEW THIS</h1>;

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.toolbarA}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.titleHeader}>
              <Link to="/" title="Agromart App" />
            </Typography>
          </div>

          <div style={{ float: "right" }}>
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
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={clsx(classes.toolbarX, classes.toolbarXResponsive)} />
        {props.children}
      </main>
    </div>
  );
}

DashboardWrapper.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DashboardWrapper;
