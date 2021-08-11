import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import actionTypes from './context/ActionTypes';
import UserContext from './context/UserContext';

const Navbar = () => {
    const [userState, dispatch] = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        // if (localStorage.getItem("id") != null) {
        //     dispatch({
        //         action: actionTypes.LOGIN,
        //         payload: {
        //             id: localStorage.getItem("id"),
        //             name: localStorage.getItem("name"),
        //             email: localStorage.getItem("email"),
        //             organization_id: localStorage.getItem("organization_id")
        //         }
        //     })
        // }
    }, [])

    let navbar;
    console.log(userState)
    const logout = async (e) => {
        e.preventDefault();

        await axios.get("http://localhost:3000/logout")
            .then((response) => {
                dispatch({
                    type: actionTypes.LOGOUT
                })
                localStorage.removeItem("user");
                if (response.status === 200) {
                    history.push("/");
                }
            })
            
    }

    if (userState.id === null) {
        navbar =(
            <nav>
                <div class="nav-wrapper">
                    <Link class="brand-logo" to="/">Adnat</Link>
                </div>
            </nav>)
    }
    else {
        navbar =(
            <nav>
                <div class="nav-wrapper">
                    <Link class="brand-logo" to="/landing">Adnat</Link>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li style={{paddingRight: "5px"}}><Link to="/profile">{userState.name}</ Link></li>
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