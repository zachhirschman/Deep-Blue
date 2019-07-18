import React, {useState, useEffect, useReducer} from "react"
import "./Dashboard.scss"
import FilterBar from "../FilterBar/FilterBar";
import Issue from "../Issue/Issue";
import AddIssue from "../AddIssue/AddIssue";
import { Link, Redirect } from "react-router-dom"
import Axios from "axios";
import Loader from "../Loader/Loader"
import Modal from "react-responsive-modal"
import reducer from "../../Redux/Reducer"
import initialState from "../../Redux/initialState"


export function Dashboard(props){
    const [issues, setIssues] = useState([])
    const [filtered, setFiltered] = useState([])
    const [redirect, setRedirect] = useState(false)
    const [location, setLocation] = useState(false)
    const [listStyle, setListStyle] = useState(false)
    const [modalState, setModalState] = useState(false)
    const [reduxState,dispatch] = useReducer(reducer,initialState)

    const handleRoute = (location) =>{
        setRedirect(true)
        setLocation(`/dashboard/${location}`)
    }
    useEffect(() =>{
        Axios.get('/api/get-user-data/').then(response =>{
            dispatch({type:'update_user', payload:response.data})
        })
        Axios.get('/api/get-issues').then(response =>{
            console.log("Got issues:", response.data)
            dispatch({type:'update_posts', payload:response.data})
            console.log("iSSUES IN STATE: ", issues)
            console.log("iSSUES IN REDUX: ", reduxState)
            setIssues(response.data)
            
        })
    },[])
    let searchIssues = (term) =>{
        console.log("term: ",term)
        let filteredArr =  issues.filter(e =>{
            console.log("Checking :", e.name)
            return e.name.toUpperCase().startsWith(term.toUpperCase())
        })
        console.log("Filtered : ", filteredArr)
        setFiltered(filteredArr)
        
    }
    let filterBy = (term) =>{
        console.log("term: ", term)
        Axios.get(`/api/filter?term=${term}`).then(response =>{
            console.log("Filtered By: ", response.data)
            setIssues(response.data)
        })
    }
    let openModal = () =>{
        console.log("Modal triggered open")
        setModalState(true)
    }
    let closeModal = () =>{
        setModalState(false)
    }
    const styles = {
        'width':'70%',
        'height':'90%',
        'display':'flex',
        'justify-content':'center',
        'align-items':'center'
    }
    console.log("Redix State: ", reduxState)
    return(
        <div className = "dashboard-parent">
            <FilterBar filterByFn = {filterBy} searchIssuesFn = {searchIssues} setListStyle = {setListStyle} listStyle = {listStyle}/>
            <div className = "dash-container-flex">
                <AddIssue openModal = {openModal}/>
                <div className ={listStyle ?  "dashboard-parent__main" : 'dashboard-parent__main-row'}>
                    {
                        filtered.length ? 
                        filtered.map(issue =>{
                            return(
                            <Issue
                                id = {issue.issue_id}
                                name = {issue.name}
                                img = {issue.thumbnail}
                                routeFn = {handleRoute}
                                listStyle = {listStyle}
                                description = {issue.description}
                                urgency = {issue.urgency}
                                />
                            )
                        })
                        :
                        issues.length ? 
                            issues.map(issue =>{
                                return(
                                <Issue id = {issue.issue_id}
                                        name = {issue.name}
                                        img = {issue.thumbnail}
                                        routeFn = {handleRoute}
                                        listStyle = {listStyle}
                                        description = {issue.description}
                                        urgency = {issue.urgency}
                                    />
                                )
                            })
                        :
                        <Loader/>
                        
                    }
                
                </div>
            </div>
            <Modal onClose = {closeModal} open = {modalState} close = {closeModal} className = "Modal">
                <div>
                    <h1>Sup hoes</h1>
                </div>
            </Modal>
            {redirect ? <Redirect to = {location}/> : null}
        </div>  
    )
}


export default Dashboard