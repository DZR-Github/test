import React from "react";
import { LeftCard } from "./components/LeftCard";
// import icon from "./assets/imgs/Gitee.svg";

const App = () => {
  return (
    <div className="main">
      <div className="box">
        <LeftCard />
        
        <div className="insideBox insideRight"></div>
      </div>
      <p className="text">some text</p>
    </div>
  );
};

export default App;
