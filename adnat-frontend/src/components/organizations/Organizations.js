import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { Link } from 'react-router-dom'
import actionTypes from '../context/ActionTypes';

const Organizations = () => {
    const [userState, dispatch] = useContext(UserContext);
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        if (userState.organization_id == null) {
            axios.get("http://localhost:3000/users/" + userState.id + "/organizations")
                .then((response) => {
                    setOrganizations(response.data);
                })
        }
    }, []);

    const join = async (org_id) => {
        // e.preventDefault();
        console.log(org_id)
        await axios.post("http://localhost:3000/join/" + userState.id + "/" + org_id)
            .then((response) => {
                dispatch({
                    type: actionTypes.JOIN,
                    payload: {
                        organization_id: org_id
                    }
                });
            });
    }

    return (
        <div>
            <h3>Organizations</h3>
            <ul class="collection">
                {organizations.map(org => {
                    return (
                        <li class="collection-item" key={org.name}>
                            <div>{org.name} at ${org.hourly}/hour
                                <Link class="secondary-content" style={{ paddingLeft: "5px" }} to={{
                                    pathname: "/organization/edit",
                                    state: { org }
                                }}>Edit</Link>
                                <Link onClick={(e) => join(org.id)} class="secondary-content" style={{ paddingRight: "5px" }}>Join</Link>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Organizations;