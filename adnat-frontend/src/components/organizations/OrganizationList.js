import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { Link } from 'react-router-dom'
import Organization from './Organization';

const OrganizationList = () => {
    const [userState, dispatch] = useContext(UserContext);
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/users/" + userState.id + "/organizations")
            .then((response) => {
                setOrganizations(response.data);
            })
    }, [userState.id]);

    return (
        <div>
            <h3>Organizations</h3>
            <ul class="collection">
                {organizations.map(org => {
                    return (
                        <Organization org={org} />
                    )
                })}
            </ul>
            <button class="btn waves-effect waves-light"><Link to="/create-organization" style={{ color: 'white' }}>Create and Join</Link></button>
        </div>
    )
}

export default OrganizationList;