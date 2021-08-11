import axios from "axios";
import { React, useContext, useState } from "react";
import { useHistory } from "react-router";
import UserContext from "./context/UserContext";

const ChangePassword = () => {
    const [userState, dispatch] = useContext(UserContext);

    const [email, setEmail] = useState(userState.email);
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === password_confirmation && password.length >= 6) {
            await axios.patch("http://localhost:3000/forgot_password", { email, password, password_confirmation })
                .then((response) => {
                    if (response.status === 200) {
                        if (userState.id != null) {
                            history.push("/profile");
                        }
                        else {
                            history.push("/");
                        }
                        alert("Password Change Succesful!");
                    }
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        alert("Email does not exist");
                        setPassword("");
                        setPasswordConfirmation("");
                    }
                })
        }
        else if (password.length < 6) {
            alert("Make sure password is at least 6 characters!");
            setPassword("");
            setPasswordConfirmation("");

        } else {
            alert("Make sure passwords match!");
            setPassword("");
            setPasswordConfirmation("");
        }
    }

    return (
        <div>
            <h4>Change your password</h4>
            <form onSubmit={handleSubmit}>
                {userState.id ? null :
                    <div class="row">
                        <input type="text" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <label for="password">Email</label>
                    </div>
                }
                <div class="row">
                    <input type="password" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <label for="password">Password (6 character minimum)</label>
                </div>
                <div class="row">
                    <input type="password" name="password_confirmation" id="password_confirmation" value={password_confirmation} onChange={(e) => { setPasswordConfirmation(e.target.value) }} />
                    <label for="password">Password Confirmation</label>
                </div>
                <button class="btn waves-effect waves-light red">Change Password</button>
            </form>
        </div>
    )
}
export default ChangePassword;