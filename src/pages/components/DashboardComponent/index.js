import React from "react";
import { connect } from "react-redux";
import { logout } from "../../../store/actions/authActions";

import DashboardLayout from "./farmers.components/DashboardLayout";
import HomeComponent from "./farmers.components/HomeComponent";
import MyFarmsComponent from "./farmers.components/MyFarmsComponent";

import ConsumerComponent from "./consumers.component";

function Dashboard(props) {
  const { user, isAuthenticated, logout } = props;
  const [active, setActive] = React.useState("My Farms");

  const { role } = user;

  if (role === "farm") {
    return (
      <DashboardLayout
        isAuthenticated={isAuthenticated}
        user={user}
        active={active}
        setActive={setActive}
        logout={logout}
      >
        {active === "Home" && <HomeComponent user={user} />}
        {active === "My Farms" && <MyFarmsComponent user={user} />}
      </DashboardLayout>
    );
  }
  return <ConsumerComponent />;
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Dashboard);
