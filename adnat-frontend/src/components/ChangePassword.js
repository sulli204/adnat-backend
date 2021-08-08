import axios from "axios";
import { React, useState } from "react";
import { useHistory } from "react-router";

const ChangePassword = (state) => {
    let email = state.location.state.email;

    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password == password_confirmation){
            await axios.patch("http://localhost:3000/forgot_password", {email, password, password_confirmation})
            .then((response) => {
                if (response.status === 200) {
                    history.push("/profile");
                    alert("Password Change Succesful!")
                }
            })
        }
    }

    return (
        <div>
            <h4>Change your password</h4>
            <form onSubmit={handleSubmit}>
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