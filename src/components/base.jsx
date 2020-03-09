import React from "react";
import Navbar from "./nav";

const Layout = props => {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
};

export { Layout };
