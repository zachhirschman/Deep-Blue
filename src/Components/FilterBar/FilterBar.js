import React from "react"
import "./FilterBar.scss"

export default function FilterBar(props){
    return(
        <div className = "filterBar-parent">
            <div>
                <input onChange = {(e) => props.searchIssuesFn(e.target.value)}/>
                <button>Search</button>
            </div>
            <div className = "filter-box">
                <h1>Filter by</h1>
                <select onChange = {(e) => props.filterByFn(e.target.value)}>
                    <option value = "time">Time posted</option>
                    <option value = "most-popular">Most popular</option>
                    <option value = "urgency">Urgency</option>
                </select>

                <button onClick = {() => props.setListStyle(!props.listStyle)}>List View</button>
            </div>
        </div>
    )
}