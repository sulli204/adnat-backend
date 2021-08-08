import { React, useContext, useState } from 'react';
import UserContext from './context/UserContext';
import actionTypes from './context/ActionTypes';
import ChangePassword from './ChangePassword';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const [userState, dispatch] = useContext(UserContext);
    const [name, setName] = useState(userState.name);
    const [email, setEmail] = useState(userState.email);
    const [organization_id, setOrganization] = useState(userState.organization_id);


    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.patch("http://localhost:3000/users/" + userState.id, { name, email, organization_id })
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.UPDATE,
                        payload: {
                            name: name,
                            email: email,
                            orangization_id: organization_id
                        }
                    })
                    alert("Profile Change Succesful!")
                }
            })
    }

    return (
        <div>
            <h4>Hello, {userState.name}!</h4>
            <p>Change your profile below.</p>
            <form onSubmit={handleSubmit}>
                <div class="row">
                    <input type="text" name="name" id="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                    <label for="email">Name</label>
                </div>
                <div class="row">
                    <input type="text" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <label for="email">Email</label>
                </div>
                <button class="btn waves-effect waves-light">Send Changes</button>
            </form>

            <button class="btn waves-effect waves-light red" style={{ paddingTop: "5 px" }}><Link to={{
                pathname: "/change-password",
                state: { email: userState.email }
            }}>Change Password</Link></button>
        </div>
    )
}
export default Profile;