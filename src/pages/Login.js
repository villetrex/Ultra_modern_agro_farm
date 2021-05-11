import React from "react";

// Page Components
import AppBar from "../components/layout/AppBar";
import LoginPageComponent from "./components/LoginpageComponent";
import Slide from "@material-ui/core/Slide";

const Login = () => {
  React.useEffect(() => {
    document.title = "Login";
  }, []);
  return (
    <>
      <Slide
        direction="right"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={1000}
      >
        <div>
          <AppBar page="login" />
        </div>
      </Slide>
      <LoginPageComponent />
    </>
  );
};

export default Login;
