import axios from 'axios';
import React, { useContext, useState } from 'react'
import UserContext from './context/UserContext';
import actionTypes from './context/ActionTypes';
import { Redirect } from 'react-router';

/* SignUp is used in Login.js
   Backend logs in user on successful creation and should redirect to
   OrganizationList.js
*/
const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [userState, dispatch] = useContext(UserContext);
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!samePassword()) {
            return;
        }

        await axios.post('http://localhost:3000/users', { name, email, password, password_confirmation })
            .then((response) => {
                if (response.status === 200) {
                    const data = response.data;

                    dispatch({
                        type: actionTypes.LOGIN,
                        payload: {
                            id: data.id,
                            name: data.name,
                            email: data.email,
                            organization_id: data.organization_id
                        }
                    })
                    setRedirect(true);
                }
            })
            .catch((error) => {
                console.log(error.response)
                if(error.response.status === 422) {
                    alert(error.response.data.e_messages);
                    setName("");
                    setEmail("");
                    setPassword("");
                    setPasswordConfirmation("");
                }
            })

    }

    const samePassword = () => {
        if (password !== password_confirmation) {
            setError("* Passwords need to match")
            setPasswordConfirmation("");
            return false;
        }
        return true;
    }

    if (redirect) {
        return <Redirect to="/landing" />;
    }

    return (
        <div class="row">
            <div class="col s6">
                <h3>Sign Up</h3>
                <form onSubmit={handleSubmit}>
                    <div class="row">
                        <input type="text" name="name" id="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                        <label for="email">Name</label>
                    </div>
                    <div class="row">
                        <input type="text" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <label for="email">Email</label>
                    </div>
                    <div class="row">
                        <input type="password" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <label for="password">Password (at least 6 characters)</label>
                    </div>
                    <div class="row">
                        <div class="red-text">{error}</div>
                        <input type="password" name="password_confirmation" id="password_confirmation" value={password_confirmation} onChange={(e) => { setPasswordConfirmation(e.target.value) }} />
                        <label for="password">Password Confirmation</label>
                    </div>
                    <button class="btn waves-effect waves-light">Signup</button>
                </form>
            </div>
        </div>
    )
}
export default SignUp;