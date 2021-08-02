import actionTypes from "./ActionTypes";

const reducer = (state, action) => {
    console.log(action.type)
    switch (action.type) {

        case actionTypes.LOGOUT:
            return {
                ...state,
                id: null,
                name: "",
                email: "",
                organization_id: null
            };


        case actionTypes.LOGIN:
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                organization_id: action.payload.organization_id
            };

        case actionTypes.JOIN:
            return {
                ...state,
                organization_id: action.payload.organization_id
            }

        default:
            console.log(state, action);
    }

}
export default reducer;