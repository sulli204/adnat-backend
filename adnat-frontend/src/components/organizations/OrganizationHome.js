import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';
import actionTypes from '../context/ActionTypes';
import { useHistory, Link } from 'react-router-dom';
import OrganizationEdit from './OrganizationEdit';

/* Shows Organization options to user
   Redirects to ShiftList, Leave Organization, and Edit
*/

const OrganizationHome = () => {
    const [org, setOrganization] = useState("");
    const [userState, dispatch] = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:3000/users/" + userState.id + "/organizations/" + userState.organization_id)
            .then((response) => {
                setOrganization(response.data);
            })
    }, [])

    const leave = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3000/leave/" + userState.id)
            .then((response) => {
                dispatch({
                    type: actionTypes.LEAVE
                })
                history.push("/landing")
            })
    }

    const editOrg = (new_org) => {
        setOrganization(new_org)
    }

    return (
        <div>
            <h3>{org.name}</h3>
            <button class="btn waves-effect waves-light" onClick={(e) => leave(e)}>Leave</button>
            <button class="btn waves-effect waves-light white">
                <OrganizationEdit editOrg={editOrg} org={org} user_id={userState.id} >Edit</OrganizationEdit>
            </button>
            <button class="btn waves-effect waves-light"><Link to={{
                pathname: "/shifts",
                state: {userState: userState}
                }} style={{ color: 'white' }}>View Shifts</Link></button>
        </div>
    )
}

export default OrganizationHome;