import React from "react";

// Page Components
import DashboardComponent from "./components/DashboardComponent";

const Home = () => {
  React.useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return <DashboardComponent />;
};

export default Home;
