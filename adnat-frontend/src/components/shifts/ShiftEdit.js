import React, { useContext, useState } from 'react'
import "materialize-css/dist/css/materialize.min.css";
import axios from 'axios';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router';

const ShiftEdit = (props) => {

    const [userState, dispatch] = useContext(UserContext);
    const [date, setDate] = useState(props.location.state.shift.date);
    const [start, setStart] = useState(props.location.state.shift.start);
    const [finish, setFinish] = useState(props.location.state.shift.finish);
    const [breakTime, setBreakTime] = useState(props.location.state.shift.break);

    const shift_id = props.location.state.shift.id;
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let shift = {
            start: date + " " + start,
            finish: date + " " + finish,
            break: breakTime
        }
        await axios.patch("http://localhost:3000/users/" + userState.id + "/organizations/" + userState.organization_id + "/shifts/" + shift_id,
            { shift }
        ).then((response) => {
            if (response.status === 200) {
                alert("Shift edited successfully");
                history.push("/shifts");
            }
        })
    }

    const cancel = (e) => {
        e.preventDefault();
        history.goBack();
    }

    const deleteShift = async (e) => {
        e.preventDefault();
        await axios.delete("http://localhost:3000/users/" + userState.id + "/organizations/" + userState.organization_id + "/shifts/" + shift_id)
            .then((response) => {
                if (response.status === 200) {
                    alert("Shift deleted successfully");
                    history.push("/shifts");
                }
            })
    }

    return (
        <div>
            <h4>Edit {props.location.state.shift.name}'s Shift</h4>
            <form>
                <div class="row">
                    <input type="text" name="place_date" id="place_date" value={date}
                        onFocus={(e) => e.target.type = 'date'}
                        onBlur={(e) => e.target.type = 'text'}
                        onChange={(e) => setDate(e.target.value)} />
                    <label for="email">Date</label>
                </div>
                <div class="row">
                    <input type="text" name="place_start" id="place_start" value={start}
                        onFocus={(e) => e.target.type = 'time'}
                        onBlur={(e) => e.target.type = 'text'}
                        onChange={(e) => setStart(e.target.value)} />
                    <label for="email">Start</label>
                </div>
                <div class="row">
                    <input type="text" name="place_finish" id="place_finish" value={finish}
                        onFocus={(e) => e.target.type = 'time'}
                        onBlur={(e) => e.target.type = 'text'}
                        onChange={(e) => setFinish(e.target.value)} />
                    <label for="email">Finish</label>
                </div>
                <div class="row">
                    <input type="number" name="place_break" id="place_break" value={breakTime} onChange={(e) => setBreakTime(e.target.value)} />
                    <label for="email">Break</label>
                </div>
                <div className="modal-footer">
                    <a className="waves-effect waves-red btn-flat" onClick={cancel}>
                        Cancel
                    </a>
                    <a className="waves-effect waves-green btn-flat" onClick={handleSubmit}>
                        Submit
                    </a>
                    <a className="right waves-effect red btn-flat" onClick={deleteShift}>
                        Delete
                    </a>
                </div>
            </form>
        </div >
    );
}

export default ShiftEdit;