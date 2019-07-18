export default function reducer(state, action){
    switch(action.type){
        case "update_posts":
            return {...state, posts:action.payload}
        case "update_user":
            return {...state,currentUser:action.payload}
        default:
            return state
    }
}