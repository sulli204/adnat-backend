import React, { useContext, useEffect, useState } from 'react';
import OrganizationEdit from './OrganizationEdit';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/UserContext';
import actionTypes from '../context/ActionTypes';

const Organization = (org) => {
    const [userState, dispatch] = useContext(UserContext)
    const [organization, setOrganization] = useState(org)

    useEffect(() => {}, [organization])

    console.log(organization)

    const join = async (org_id) => {
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

    const editOrg = (org) => {
        setOrganization({org});
}

return (

    <div>
        <li class="collection-item" key={organization.org.name}>
            <div>{organization.org.name} at ${organization.org.hourly}/hour
                <OrganizationEdit class="secondary-content" editOrg={editOrg} org={organization.org} user_id={userState.id} />
                <Link onClick={(e) => join(organization.org.id)} class="secondary-content" style={{ paddingRight: "5px" }}>Join</Link>
            </div>

        </li>
    </div>
);
}

export default Organization;