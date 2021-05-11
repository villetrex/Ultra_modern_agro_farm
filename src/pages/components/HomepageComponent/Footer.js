import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles(theme => ({
  root: {
    height: "inherit",
    // background: theme.palette.secondary.main,
    background: "rgba(18, 107, 22, 1)",
    color: "white",
    padding: 50,
    marginTop: 50,
    [theme.breakpoints.down("md")]: {
      padding: 20,
      paddingTop: 50,
    },
  },
  first: {
    [theme.breakpoints.down("md")]: {},
  },
  divider: {
    background: "#ffffff91",
    margin: "10px 0",
  },

  myIcons: {
    marginBottom: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },

  heading: {
    color: "white",
    fontSize: 25,
    marginBottom: 20,
    [theme.breakpoints.down("sm")]: {
      fontSize: 19,
    },
  },

  item: {
    color: "#ffffff91",
    fontSize: 19,
    marginBottom: 5,
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },

  copyright: {
    color: "#ffffff91",
    marginTop: 10,
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <div className={classes.heading}>About</div>
          <div className={classes.item}>Our Projects</div>
          <div className={classes.item}>Partnership</div>
          <div className={classes.item}>Locate a Farmer</div>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <div className={classes.heading}>Support</div>
          <div className={classes.item}>Support Request</div>
          <div className={classes.item}>Contact</div>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Divider className={classes.divider} />
        </Grid>

        <Grid container>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <Typography
              variant="body2"
              color="inherit"
              align="left"
              className={classes.copyright}
            >
              All rights reserved &copy; {new Date().getFullYear()}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={4}>
            <div className={classes.myIcons}>
              <IconButton>
                <FacebookIcon style={{ color: "#fff" }} />
              </IconButton>
              <IconButton>
                <TwitterIcon style={{ color: "#fff" }} />
              </IconButton>
              <IconButton>
                <LinkedInIcon style={{ color: "#fff" }} />
              </IconButton>{" "}
              <IconButton>
                <InstagramIcon style={{ color: "#fff" }} />
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
