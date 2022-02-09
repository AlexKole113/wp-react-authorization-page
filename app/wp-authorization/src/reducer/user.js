import userAction from "../actions/user";

const userReducer = (state, action) => {
    let newState;
    switch (action.type) {
        case userAction.authorized.type :
            newState = { state: userAction.authorized.type , data: action.payload };
            break;
        case userAction.failure.type :
            newState = { state: userAction.failure.type , data: {} };
            break;
        default:
            throw new Error();
    }
    return newState;
}
export default userReducer;
