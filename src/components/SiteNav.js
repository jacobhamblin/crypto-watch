import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./siteNav.scss";

function curPathStyle() {
  let hist, crypto, about;
  const bold = { fontWeight: "bold" };
  const location = window.location.href;
  hist = bold;
  if (location.includes('cryptocurrency')) {
    crypto = bold;
  } else if (location.includes('about')) {
    about = bold;
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
        <li style={about}>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default SiteNav;