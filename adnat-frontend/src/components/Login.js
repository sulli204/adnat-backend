import React, { Component } from 'react'
import axios from 'axios';

export default class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit (e) {
        e.preventDefault()
        const { email, password } = this.state

        axios.post("http://localhost:3000/login", {email, password})
            .then(response => console.log(response.data))
    }

    render() {
        return (
            <div class="row">
                <div class="col s6">
                    <h3>Login</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div class="row">
                            <input type="text" name="email" id="email" value={this.state.email} onChange={this.handleChange} />
                            <label for="email">Email</label>
                        </div>
                        <div class="row">
                            <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
                            <label for="password">Password</label>
                        </div>
                        <button class="btn waves-effect waves-light">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}