import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

import markdownPath from "./About.md";

const About = () => {
  const [markdown, setMarkdown] = useState("");
  useEffect(() => {
    fetch(markdownPath)
      .then(res => res.text())
      .then(text => setMarkdown(text));
  }, []);

  console.log(process.env.REACT_APP_COINMARKETCAP_KEY);
  return <ReactMarkdown source={markdown} />;
};

export default About;
