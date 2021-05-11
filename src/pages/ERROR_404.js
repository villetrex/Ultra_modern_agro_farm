import React from "react";

// Material UI Components
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "../components/layout/AppBar";

// Custom Component
import Link from "../components/Link";

// Material Ui Styling
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // padding: 50,
    // margin: 50,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const ErrorPage = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar />

      <Container maxWidth="lg">
        <Box my={6} className={classes.root}>
          <Typography variant="h2" component="h1" gutterBottom align="center">
            404 PAGE NOT FOUND
          </Typography>
          <Button color="primary" variant="outlined">
            <Link to="/" title="HOMEPAGE" />
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ErrorPage;
