import React, {useState} from "react"
import bgVideo from "../../Images/Mare - 22183.mp4"
import pollution from "../../Images/pollution.png"
import {Line} from "react-chartjs-2"
import "./Home.scss"

export default function Home(){
    const [width, setWidth] = useState(window.innerWidth)
    let handleWindowChange = () =>{
        setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleWindowChange )
    return(
        <div>
            <video className = "bgVideo" autoPlay muted loop>
                <source src = {bgVideo} type = "video/mp4"></source>
            </video>
            <div className = "home-parent-content">
                <h1 className = "fade header-text">The ocean is beautiful, let's keep it that way</h1>
                <div className = {width >500 ? "content-container" : "content-container-mobile"}>
                    <div className = {width >500 ?"text-holder" : "text-holder-mobile"}>
                        <p className = "fade p-text">
                            It is now believed that there are <strong className = "strong">5.25 trillion pieces of plastic debris in the ocean.</strong> Of that mass, 269,000 tons float on the surface,
                             while some four billion plastic microfibers per square kilometer litter the deep sea.
                            Shoppers worldwide are using approximately <strong className = "strong">500 billion single-use plastic bags per year.</strong>
                            This translates to about a million bags every minute across the globe, or 150 bags a year for every person on earth.
                            <strong className = "strong"> <br/>And the number is rising.</strong>
                        </p>
                    </div>
                    {width > 500? null : <div className = "line"></div>}
                    <div className = {width > 500? "image-holder" : "image-holder-mobile"}>
                        <img className = "polution" src = {pollution}/>
                    </div>
                </div>
            </div>

            <div className = "about-content">
                <div className = "circle green">

                </div>
                <div className = "circle charcoal">

                </div>
                <div className = "circle white">

                </div>
            </div>
        </div>
    )
}