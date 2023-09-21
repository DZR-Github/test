import React from "react"
import leftImg from "@/assets/imgs/left.png"
import rightImg from "@/assets/imgs/right.png"

export const Background=()=>{
    return (
        <div className="background">
            <div className="leftImg"><img src={leftImg} style={{width:"100%",height:"100%"}}/></div>
            <div className="rightImg"><img src={rightImg} style={{width:"100%",height:"100%"}} /></div>
        </div>
    )
}