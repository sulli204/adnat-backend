import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import actionTypes from './context/ActionTypes';
import UserContext from './context/UserContext'

const Navbar = () => {
    const [userState, dispatch] = useContext(UserContext);
    const [redirect, setRedirect] = useState(false)

    let navbar;
    console.log(userState)

    const logout = async (e) => {
        e.preventDefault();

        await axios.get("http://localhost:3000/logout")
            .then((response) => {
                dispatch({
                    type: actionTypes.LOGOUT
                })
            })
            .then(setRedirect(true))
    }

    if (userState.id == null) {
        navbar =(
            <nav>
                <div class="nav-wrapper">
                    <a class="brand-logo">Adnat</a>
                </div>
            </nav>)
    }
    else {
        navbar =(
            <nav>
                <div class="nav-wrapper">
                    <a class="brand-logo">Adnat</a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li style={{paddingRight: "25px"}}>{userState.name}</li>
                        <li><Link onClick={logout} to="/">Logout</Link></li>
                    </ul>
                </div>
            </nav>)
    }
    return (
        <div>
            {navbar}
        </div>
    )
}

export default Navbar;