import React, { setState } from 'react'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import axios from 'axios';


class OrganizationEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            place_name: this.props.org.name,
            place_hourly: this.props.org.hourly
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const options = {
            inDuration: 250,
            outDuration: 250,
            opacity: 0.5,
            dismissible: false,
            startingTop: "4%",
            endingTop: "10%"
        };
        M.Modal.init(this.Modal, options);
        // If you want to work on instance of the Modal then you can use the below code snippet 
        // let instance = M.Modal.getInstance(this.Modal);
        // instance.open();
        // instance.close();

    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit() {
        console.log(this.state.place_name);
        console.log(this.state.place_hourly);
        let name = this.state.place_name;
        let hourly = this.state.place_hourly;

        axios.patch("http://localhost:3000/users/" + this.props.user_id + "/organizations/" + this.props.org.id, {name, hourly})
            .then((response) => {
                console.log(response.data)
            });
    }

    render() {
        return (
            <div>
                <a href="#!" class="secondary-content modal-trigger" data-target="modal1" style={{ paddingLeft: "5px" }}>Edit</a>
                <div
                    ref={Modal => {
                        this.Modal = Modal;
                    }}
                    id="modal1"
                    className="modal"
                >
                    <div className="modal_content">
                        <h4>Edit {this.props.org.name}</h4>
                        <form>
                            <div class="row">
                                <input type="text" name="place_name" id="place_name" placeholder={this.props.org.name} onChange={this.handleChange} />
                                <label for="email">Name</label>
                            </div>
                            <div class="row">
                                <input type="decimal" name="place_hourly" id="place_hourly" placeholder={this.props.org.hourly} onChange={this.handleChange} />
                                <label for="email">Hourly</label>
                            </div>
                            <div className="modal-footer">
                                <a className="modal-close waves-effect waves-red btn-flat">
                                    Cancel
                                </a>
                                <a className="modal-close waves-effect waves-green btn-flat" onClick={this.handleSubmit}>
                                    Submit
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrganizationEdit;