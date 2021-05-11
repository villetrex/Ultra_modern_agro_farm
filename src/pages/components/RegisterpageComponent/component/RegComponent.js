import React from "react";
import Button from "@material-ui/core/Button";
import MTextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Link from "../../../../components/Link";
import Slide from "@material-ui/core/Slide";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";

const TextField = withStyles({
  root: {
    "& label.Mui-focused": {
      borderColor: "#1a941f",
      // color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#1a941f",
      borderColor: "#1a941f",
      // color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#1a941f",
        // color: "white",
      },
      "& input": {
        borderColor: "#1a941f",
        // color: "white",
      },
      "& label": {
        borderColor: "#1a941f",
        // color: "white",
      },
      "&:hover fieldset": {
        borderColor: "#1a941f",
        // color: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1a941f",
        // color: "white",
      },
    },
    "& .MuiInputLabel-root": {
      borderColor: "#1a941f",
      // color: "white",
    },
  },
})(MTextField);

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  root: {},
}));

const ConsumerReg = props => {
  const classes = useStyles();

  const { onSubmitForm, type, isLoading, reset, setReset } = props;

  // Form Fields
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [conPassword, setConPassword] = React.useState("");

  const onSubmit = e => {
    e.preventDefault();

    const data = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password: password.trim(),
      conPassword: conPassword.trim(),
    };
    onSubmitForm(data, type.toLowerCase());
  };

  const onReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConPassword("");
  };

  React.useEffect(() => {
    if (reset) {
      onReset();
      setReset(false);
    }
  }, [reset, setReset]);

  return (
    <Container component="main" maxWidth="xs">
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
          <Grid container spacing={1}>
            <Grid item xs={6} sm={6}>
              <TextField
                color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                label="First Name"
                autoComplete="fname"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                label="Last Name"
                autoComplete="lname"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                margin="normal"
                color="secondary"
                required
                fullWidth
                size="small"
                label="Email"
                type="email"
                value={email}
                autoComplete="email"
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                type="password"
                label="Password"
                autoComplete="Password"
                color="secondary"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                color="secondary"
                type="password"
                label="Confirm Password"
                autoComplete="Password"
                value={conPassword}
                onChange={e => setConPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                color="secondary"
                margin="normal"
                required
                fullWidth
                size="small"
                type="text"
                label="Select User Type"
                autoComplete="Password"
                value={type.toUpperCase()}
                onChange={e => {}}
              />
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                <span> Signup as {type}</span>
              )}
            </Button>

            <Grid item>
              <Typography variant="body2">
                <Link
                  to="/login"
                  title="Already? have an account? Login"
                  style={{ color: "#556cd6" }}
                />
              </Typography>
            </Grid>
          </Grid>
        </Slide>
      </form>
    </Container>
  );
};

export default ConsumerReg;
