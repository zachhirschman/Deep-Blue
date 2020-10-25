import React, {useState, useEffect, useRef} from "react"
import bgVideo from "../../Images/Mare - 22183.mp4"
import pollution from "../../Images/pollution.png"
import {Line} from "react-chartjs-2"
import "./Home.scss"


export default function Home(){
    const [width, setWidth] = useState(window.innerWidth)
    const canvasRef = useRef(null)
    let handleWindowChange = () =>{
        setWidth(window.innerWidth)
    }

    let initCanvas = () =>{
        
    }

    useEffect(() =>{
        initCanvas()
        return () =>{
            setWidth(null)
        }
    },[])
    window.addEventListener("resize", handleWindowChange )
    return(
        <div className = "home-root-parent">
            <video className='videoTag' autoPlay loop muted>
                <source src={bgVideo} type='video/mp4' />
            </video>
        </div>
    )
}