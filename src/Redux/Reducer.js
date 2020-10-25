let initialState = {
    posts:[],
    currentUser:null
}

const updateUser = 'update_user';
const updatePosts = 'update_posts';

export default function reducer(state = initialState, action){
    switch(action.type){
        case updatePosts:
            return {...state, posts:action.payload}
        case updateUser:
            return {...state,currentUser:action.payload}
        default:
            return state
    }
}

export function setUser(updated_user){
    console.log("Set User: ", updated_user)
    return{
        type:updateUser,
        payload:updated_user
    }
}

export function setPosts(updated_post){ 
    return{
        type:updatePosts,
        payload:updated_post
    }
}