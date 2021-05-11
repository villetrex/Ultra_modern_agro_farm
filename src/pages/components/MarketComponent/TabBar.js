import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { Divider } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles(theme => ({
  grow: {
    margin: 20,
    padding: 20,
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "start",
    [theme.breakpoints.down("sm")]: {
      marginTop: 20,
      flexDirection: "column",
      marginLeft: -10,
    },
  },

  title: {
    marginRight: 30,
    float: "left",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 15,
      fontSize: 20,
      flex: 1,
      textAlign: "left",
    },
  },

  wrap_1: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
  },

  wrap_2: {
    display: "flex",
    flex: 1,
    float: "right",
  },
  white: {
    color: "black",
  },
}));

export default function PrimarySearchAppBar({ number }) {
  const classes = useStyles();

  return (
    <>
      <Paper elevation={0} className={classes.grow}>
        <div className={classes.wrap_1}>
          <Typography
            className={clsx(classes.title, classes.white)}
            variant="h4"
            noWrap
          >
            Market Data{" "}
          </Typography>
          <Badge
            badgeContent={number}
            color="secondary"
            style={{ marginRight: 10 }}
          />
        </div>

        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          className={classes.wrap_2}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Divider />
    </>
  );
}
