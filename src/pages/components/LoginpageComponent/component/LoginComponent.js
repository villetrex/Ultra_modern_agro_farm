import React from "react";

// Material UI Components
import Button from "@material-ui/core/Button";
import MTextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MLink from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
// Customized Cmponent
import Link from "../../../../components/Link";

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

// Material UI Styling
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function ConsumerLogin(props) {
  const classes = useStyles();
  const { isLoading, onSubmitForm, reset, setReset } = props;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    onSubmitForm(data);
  };

  const onReset = () => {
    setEmail("");
    setPassword("");
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
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              color="secondary"
              id="email"
              size="small"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              variant="outlined"
              size="small"
              color="secondary"
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
          <FormControlLabel
            label="Remember me"
            control={<Checkbox value="remember" color="secondary" />}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : <span> Login </span>}
          </Button>
          <Grid item xs>
            <MLink href="#" variant="body2" style={{ color: "#556cd6" }}>
              Forgot password?
            </MLink>
          </Grid>
          <Grid item>
            <Typography variant="body2">
              <Link
                to="/signup"
                title="Dont have an account? Sign Up"
                style={{ color: "#556cd6" }}
              />
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
export default ConsumerLogin;
