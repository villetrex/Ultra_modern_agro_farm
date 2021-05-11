import React from "react";

// Page Components
import HomePageComponent from "./components/HomepageComponent";

const Home = () => {
	React.useEffect(() => {
		document.title = "Agromart";
	}, []);
	return <HomePageComponent />;
};

export default Home;
