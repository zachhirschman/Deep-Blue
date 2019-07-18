import React, {useState,useEffect} from "react"
import "./Contributions.scss"
import {Line} from "react-chartjs-2"

export default function Contributions(){
    const [ width, setWidth] = useState(window.innerWidth)
    
    let useEffect = () =>{
        // Make axios request to get user's information

    }
    let handleWindowResize = () =>{
        setWidth(window.innerWidth)
    }
    let dataSet = {
        labels:['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets:[
            {
                label:'Monthly Contributions',
                fillColor: 'rgba(97, 97, 230,0)',
                strokeColor:'rgb(97, 97, 230)',
                pointColor:'rgb(97, 97, 230)',
                pointStrokeColor:'rgb(97, 97, 230)',
                pointHighlightFill:'rgb(97, 97, 230)',
                // no data for now
                data:[1,2,0,0.5,0,1]
            }
        ]
    }

    const options = {
        scaleShowGridLines: true,
        scaleGridLineColor: 'rgba(0,0,0,.05)',
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        bezierCurve: true,
        bezierCurveTension: 0.4,
        pointDot: true,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: true,
        datasetStrokeWidth: 2,
        datasetFill: true,
        legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
      }
    window.addEventListener("resize",handleWindowResize)
    return(
        <div className = {width > 500 ? "Contributions-parent__desktop" : "Contributions-parent__mobile"}>
            {
                width > 500 ? 

                <div className = "Contributions-parent__desktop__content-parent">
                        <div className = "Contributions-parent__desktop__personal-info-parent">
                            <div>

                            </div>
                        </div>
                        <div className = "Contributions-parent__desktop__Line-parent">
                            <Line options = {options} data = {dataSet}/>
                        </div>
                </div>

                :

                <div className = "Contributions-parent__mobile__content-parent">
                    
                </div>
            }
        </div>
    )
}