import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "../../../components/Link";

// import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const useStylesBlock = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    cursor: "pointer",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      padding: "20px 0",
    },
  },
  imgWrapper: {
    height: 40,
    [theme.breakpoints.down("sm")]: {
      height: 40,
    },
  },
  body: {
    padding: 10,
    color: "#d2e0d3",
    [theme.breakpoints.down("sm")]: {
      padding: 5,
    },
  },
}));

const Block = ({ item }) => {
  const classes = useStylesBlock();

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.imgWrapper}>
          <div
            style={{
              background: `url('${item.bg}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          />
        </div>

        <div>
          <Typography
            style={{ marginTop: 5, color: "white" }}
            variant="h5"
            component="h2"
          >
            <span> {item.title} </span>
          </Typography>

          <Typography
            className={classes.body}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            <span> {item.body} </span>
          </Typography>

          <Button
            size="medium"
            style={{ fontSize: 9, marginTop: 6, marginBottom: 5 }}
            color="inherit"
            variant="outlined"
          >
            <Link to={item.link} title={item.btn} />
          </Button>
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    marginBottom: "30px",
    [theme.breakpoints.up("sm")]: {
      marginBottom: 0,
      flexDirection: "row",
    },
  },

  paper: {
    width: "100%",
    userSelect: "none",
    height: "100%",
    flex: 1,
    textAlign: "center",
    color: "white",
  },
  zoom: {
    padding: 0,
    width: "90%",
    // height: "270px",
    cursor: "pointer",
    margin: "0 auto",
    userSelect: "none",
    marginBottom: "0px",
    [theme.breakpoints.up("sm")]: {
      margin: "5px 0",
      flexBasis: "50%",
      maxWidth: "345px",
      height: "270px",
    },
  },
}));

export default function ImgMediaCard() {
  const classes = useStyles();

  const items = [
    {
      alt: "Earn",
      title: "Are you a farmer?",
      bg: "/svg/farmer1sss.svg",
      body: "Got a farm! Want to market your products?",
      btn: "click me",
      link: "/signup?type=farmer",
      style: {},
    },

    {
      alt: "Cashout",
      title: "Consumer?",
      bg: "/svg/customersss.svg",
      body:
        "Make direct contact to farmers in a jiffy without stress and middlemen. Get connected and make trade like never before!",
      btn: "click me",
      link: "/signup?type=consumer",
      style: {},
    },

    {
      alt: "Cashout",
      title: "Retailer? Wholesaler?",
      bg: "/svg/retailersss.svg",
      body: "Do you have farm products and services you like to sell",
      btn: "click me",
      link: "/signup?type=retailer",
      style: {},
    },
  ];
  return (
    <>
      <div className={classes.root}>
        {items.map((item) => (
          <div
            className={classes.zoom}
            style={{ ...item.style }}
            key={item.title}
          >
            <div className={classes.paper}>
              <Block item={item} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
