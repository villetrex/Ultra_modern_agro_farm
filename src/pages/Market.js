import React from "react";

// Page Components
import MarketComponent from "./components/MarketComponent";
import AppBar from "../components/layout/AppBar";

const Home = () => {
  React.useEffect(() => {
    document.title = "Market";
  }, []);

  return (
    <>
      <AppBar page="market" />
      <MarketComponent />
    </>
  );
};

export default Home;
