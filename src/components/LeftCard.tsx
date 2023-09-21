import React from "react";
import icon from "../assets/imgs/Gitee.svg";

export const LeftCard=()=>{
    return (
        <div className="insideBox insideLeft">
          <div className="insideLeftMiddle">
            <div className="insideLeftInner">
              <div
                style={{
                  display: "flex",
                  marginTop: "70px",
                  lineHeight: "45px",
                  padding: "0",
                }}
              >
                <img
                  src={icon}
                  alt="icon_gitee"
                  style={{ height: "45px" }}
                />
              </div>
              <h2
              className="leftTitle"
              >
                企业级 DevOps 研发管理平台
              </h2>
            </div>
          </div>
        </div>
    )
}