import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./siteNav.scss";

function curPathStyle() {
  let hist, crypto, about;
  const bold = { fontWeight: "bold" };
  const location = window.location.href;
  if (location.includes('markets')) {
    crypto = bold;
  } else if (location.includes('about')) {
    about = bold;
  } else {
    hist = bold;
  }

  return { hist, crypto, about };
}

const SiteNav = () => {
  const { hist, crypto, about } = curPathStyle();

  return (
    <nav className="siteNav">
      <ul>
        <li style={hist}>
          <Link to="/btchistory">History</Link>
        </li>
        <li style={crypto}>
          <Link to="/markets">Markets</Link>
        </li>
        <li style={about}>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(SiteNav);
