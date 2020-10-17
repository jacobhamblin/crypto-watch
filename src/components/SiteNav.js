import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./siteNav.scss";

function curPathStyle() {
  let exchStyle, histStyle, aboutStyle;
  let bold = { fontWeight: "bold" };
  let location = window.location.hash;
  if (
    location === "#/" ||
    location === "#/exchanges" ||
    location === "#/exchanges/"
  ) {
    exchStyle = bold;
  } else if (location === "#/history" || location === "#/history/") {
    histStyle = bold;
  } else if (location === "#/about" || location === "#/about/") {
    aboutStyle = bold;
  }

  return { exchStyle, histStyle, aboutStyle };
}

const SiteNav = () => {
  const { exchStyle, histStyle, aboutStyle } = curPathStyle();

  // <li style={exchStyle}><Link to='/exchanges'>Exchanges</Link></li>
  // <li style={histStyle}><Link to='/history'>History</Link></li>
  return (
    <nav className="siteNav">
      <ul>
        <li style={aboutStyle}>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SiteNav;
