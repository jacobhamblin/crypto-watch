import React, { Component } from "react";
import markdownToHTML from "../utils/markdown";
import ReadMe from "../../../README.md";

const About = () => {
  const html = markdownToHTML(ReadMe);

  return (
    <div className="about">
      <span
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default About;
