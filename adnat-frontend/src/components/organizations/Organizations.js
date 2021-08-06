import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { Link } from 'react-router-dom'
import actionTypes from '../context/ActionTypes';
import Organization from './Organization';

const Organizations = () => {
    const [userState, dispatch] = useContext(UserContext);
    const [organizations, setOrganizations] = useState([]);
    const [employer, setEmployer] = useState("");

    useEffect(() => {
        if (userState.organization_id == null) {
            axios.get("http://localhost:3000/users/" + userState.id + "/organizations")
                .then((response) => {
                    setOrganizations(response.data);
                })
        }
        else {
            axios.get("http://localhost:3000/users/" + userState.id + "/organizations/" + userState.organization_id)
                .then((response) => {
                    setEmployer(response.data)
                })
        }
    }, [userState.organization_id, userState.id]);

    const leave = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3000/leave/" + userState.id)
        .then((response) => {
            dispatch({
                type: actionTypes.LEAVE
            })
        })
    }

    const renderContent = () => {
        if (userState.organization_id == null) {
            return (
                <div>
                    <h3>Organizations</h3>
                    <ul class="collection">
                        {organizations.map(org => {
                            return (
                                <Organization org={org}/>
                            )
                        })}
                    </ul>
                    <button class="btn waves-effect waves-light"><Link to="/create-organization" style={{color:'white'}}>Create and Join</Link></button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h3>{employer.name}</h3>
                    <button class="btn waves-effect waves-light" onClick={(e) => leave(e)}>Leave</button>
                    <button class="btn waves-effect waves-light"><Link to="/signup" style={{color:'white'}}>Edit</Link></button>
                    <button class="btn waves-effect waves-light"><Link to="/signup" style={{color:'white'}}>View Shifts</Link></button>
                </div>
            )
        }
    }

    return (
        <div>
            {renderContent()}
        </div>
    )
}

export default Organizations;