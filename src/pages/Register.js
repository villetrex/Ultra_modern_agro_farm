import React from "react";

// Page Components
import AppBar from "../components/layout/AppBar";
import RegisterPageComponent from "./components/RegisterpageComponent";
import Slide from "@material-ui/core/Slide";

const SignUp = () => {
  React.useEffect(() => {
    document.title = "Sign Up";
  }, []);
  return (
    <>
      <Slide
        direction="left"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={1000}
      >
        <div>
          <AppBar page="signup" />
        </div>
      </Slide>
      <RegisterPageComponent />
    </>
  );
};

export default SignUp;
