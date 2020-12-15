import React, { useState, useEffect } from "react";

export default ({ numChars }) => {
  const createString = () => {
    let initialString = "";
    for (let i = 0; i < 5; i++) {
      initialString += Math.random()
        .toString(36)
        .substring(2);
    }
    let newString = "";
    for (let i = 0; i < initialString.length; i++) {
      const rand = Math.random();
      if (rand <= 0.25) {
        newString += " !$%^-*_/,"[parseInt(Math.random() * 10)];
      } else {
        newString += initialString[i];
      }
    }
    return newString.substring(0, numChars);
  };

  const [chars, setChars] = useState(createString());

  useEffect(() => {
    const animation = setInterval(() => {
      setChars(createString());
    }, 200);
    return () => clearInterval(animation);
  }, []);

  return <span>{chars}</span>;
};
