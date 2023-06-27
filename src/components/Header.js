import React from "react";
import phabioImage from "./../img/Phabio.jpg";

function Header(){
  return (
    <React.Fragment>
    <h1>Help Queue</h1>
    <img src={phabioImage} alt="It's Phabio" />
    </React.Fragment>
  );
}

export default Header;