import React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const checkRole = role => {
  if (role === "farm") return "Farmer";
  if (role === "cons") return "Consumer";
  if (role === "ret") return "Retailer";
  return "User";
};

function HomeComponent(props) {
  const { email, fullName, role } = props.user;

  return (
    <>
      <h3>Welcome {fullName}! </h3>{" "}
      <List dense={true}>
        <ListItem>
          <ListItemText primary={"Full Name"} secondary={fullName} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={"Email"} secondary={email} />
        </ListItem>

        <Divider />
        <ListItem>
          <ListItemText primary={"Role"} secondary={checkRole(role)} />
        </ListItem>
        <Divider />
      </List>
    </>
  );
}

export default HomeComponent;
