import actionTypes from "./ActionTypes";

/* Keeps track of userState through out all of application
   Info is persisted in localStorage
*/

const reducer = (state, action) => {
    switch (action.type) {

        case actionTypes.LOGOUT:
            localStorage.setItem("isLoggedIn", "false")
            localStorage.removeItem('name');
            localStorage.removeItem('id');
            localStorage.removeItem('email');
            localStorage.removeItem('organization_id');
            return {
                ...state,
                id: null,
                name: "",
                email: "",
                organization_id: null
            };


        case actionTypes.LOGIN:

            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem('name', action.payload.name);
            localStorage.setItem('id', action.payload.id);
            localStorage.setItem('email', action.payload.email);
            
            if (action.payload.organization_id === null) {
                return {
                    ...state,
                    id: action.payload.id,
                    name: action.payload.name,
                    email: action.payload.email
                };
            }
            else {
                localStorage.setItem('organization_id', action.payload.organization_id);
                return {
                    ...state,
                    id: action.payload.id,
                    name: action.payload.name,
                    email: action.payload.email,
                    organization_id: action.payload.organization_id,
                };
            }
        case actionTypes.JOIN:
            localStorage.setItem("organization_id", action.payload.organization_id);
            return {
                ...state,
                organization_id: action.payload.organization_id
            }

        case actionTypes.LEAVE:
            localStorage.removeItem("organization_id");
            return {
                ...state,
                organization_id: null
            }

        case actionTypes.UPDATE:
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email
            }

        default:
            console.log(state, action);
    }

}
export default reducer;