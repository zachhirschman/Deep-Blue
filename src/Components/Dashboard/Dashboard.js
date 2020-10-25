import React, {useState, useEffect, useReducer} from "react"
import "./Dashboard.scss"
import FilterBar from "../FilterBar/FilterBar";
import Issue from "../Issue/Issue";
import AddIssue from "../AddIssue/AddIssue";
import { Link, Redirect, useHistory } from "react-router-dom"
import Axios from "axios";
import Loader from "../Loader/Loader"
import Modal from "react-responsive-modal"
import reducer from "../../Redux/Reducer"
// import initialState from "../../Redux/initialState"


export function Dashboard(props){
    const [issues, setIssues] = useState([])
    const [filtered, setFiltered] = useState([])
    const [redirect, setRedirect] = useState(false)
    const [location, setLocation] = useState(false)
    const [listStyle, setListStyle] = useState(false)
    const [modalState, setModalState] = useState(false)
    // const [reduxState, dispatch] = useReducer(reducer,initialState)
    const [noPosts, setNoPosts] = useState(false);

    const history = useHistory();

    const handleRoute = (location) =>{
        setRedirect(true)
        setLocation(`/dashboard/${location}`)
    }
    useEffect(() =>{
        Axios.get('/api/get-user-data/').then(response =>{
            if(!response.data){
                history.push("/");
            }
            // dispatch({type:'update_user', payload:response.data})
        })

        Axios.get('/api/get-issues').then(response =>{
            if(!response.data.length){
                setNoPosts(true);
            }
            // dispatch({type:'update_posts', payload:response.data})
            setIssues(response.data)
            
        })

    },[])
    let searchIssues = (term) =>{
        let filteredArr =  issues.filter(e =>{
            return e.name.toUpperCase().startsWith(term.toUpperCase())
        })
        setFiltered(filteredArr)
        
    }
    let filterBy = (term) =>{
        Axios.get(`/api/filter?term=${term}`).then(response =>{
            setIssues(response.data)
        })
    }
    let openModal = () =>{
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

    let noPostsElement = (
        <div className="no-posts-found">
            <h1>No Issues Found!</h1>
        </div>
    );

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
                                key = {issue.issue_id}
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
                                        key = {issue.issue_id}
                                    />
                                )
                            })
                        :
                        noPosts ? 
                            noPostsElement
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