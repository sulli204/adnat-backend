import axios from 'axios';
import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import actionTypes from '../context/ActionTypes';
import { Redirect } from 'react-router';

/* User can create and join an Organization.
   User will be redirected to their OrganizationHome
*/

const CreateOrganization = () => {
    const [userState, dispatch] = useContext(UserContext);
    const [orgName, setOrgName] = useState("");
    const [hourly, setHourly] = useState("0");
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let name = orgName;

        await axios.post("http://localhost:3000/users/" + userState.id + "/organizations", { name, hourly })
            .then((response) => {
                if (response.status === 200) {
                    console.log("Created")
                    console.log(response.data)
                    axios.post("http://localhost:3000/join/" + userState.id + "/" + response.data.id)
                        .then((response) => {
                            dispatch({
                                type: actionTypes.JOIN,
                                payload: {
                                    organization_id: response.data.organization_id
                                }
                            });
                            setRedirect(true);
                        });
                }
            })
            .catch((error) => {
                if (error.response.status === 422){
                    alert(error.response.data.e_messages)
                }
            });
    }

    if (redirect){
        return <Redirect to="/landing"/>;
    }

    return (
        <div class="row">
            <div class="col s6">
                <h3>Create Organization</h3>
                <form onSubmit={handleSubmit}>
                    <div class="row">
                        <input type="text" name="orgName" id="orgName" value={orgName} onChange={(e) => { setOrgName(e.target.value) }} />
                        <label for="orgName">Organization Name</label>
                    </div>
                    <div class="row">
                        <input type="number" name="hourly" id="hourly" min="0.00" step="0.01" value={hourly} onChange={(e) => { setHourly(e.target.value) }} />
                        <label for="hourly">Hourly Rate</label>
                    </div>
                    <button class="btn waves-effect waves-light">Create and Join</button>
                </form>
            </div>
        </div>
    )
}

export default CreateOrganization;