import React, { useContext, useState } from 'react'
import axios from 'axios';
import UserContext from './context/UserContext';
import actionTypes from './context/ActionTypes';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const Login = () => {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [redirect, setRedirerct] = useState(false)
    const [userState, dispatch] = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post("http://localhost:3000/login", { email, password })
            .then((response) => {
                const data = response.data;
                dispatch({
                    type: actionTypes.LOGIN,
                    payload: {
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        organization_id: data.organization_id
                    }
                });
                localStorage.setItem('name', response.data.name);
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('organization_id', response.data.organization_id);
                setRedirerct(true);
            })
            .catch(error => {
                if (error.response.status === 401){
                    alert("Incorrect Username or Password");
                    setPassword("");
                }
            })

    }

    if (redirect) {
        return <Redirect to="/landing" />;
    }

    return (
        <div class="row">
            <div class="col s6">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    <div class="row">
                        <input type="text" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <label for="email">Email</label>
                    </div>
                    <div class="row">
                        <input type="password" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <label for="password">Password</label>
                    </div>
                    <button class="btn waves-effect waves-light">Submit</button>
                    <button class="btn waves-effect waves-light"><Link to="/signup" style={{ color: 'white' }}>Sign Up</Link></button>
                    <button class="btn waves-effect waves-light"><Link to="/change-password" style={{ color: 'white' }}>Forgot Password</Link></button>
                </form>
            </div>
        </div>
    )
}

export default Login;
