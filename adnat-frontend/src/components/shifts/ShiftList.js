import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Shift from './Shift'

/* Displays beautified shifts sent from rails backend
   Allows user to add a new shift
   Displays shifts from former employees
*/

const ShiftList = (props) => {
    const [userState, dispatch] = useContext(UserContext);
    const [shifts, setShifts] = useState([]);
    const [date, setDate] = useState("");
    const [start, setStart] = useState("");
    const [finish, setFinish] = useState("");
    const [breakTime, setBreakTime] = useState("0");
    const [current, setCurrent] = useState(true);
    const history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:3000/users/" + userState.id + "/organizations/" + userState.organization_id + "/shifts")
            .then((response) => {
                setShifts(response.data);
            });
    }, [userState.id, userState.organization_id])

    const addShift = async (e) => {
        e.preventDefault();

        let shift = {
            start: date + " " + start,
            finish: date + " " + finish,
            break: breakTime,
            user_id: userState.id
        }
        await axios.post("http://localhost:3000/users/" + userState.id + "/organizations/" + userState.organization_id + "/shifts",
            { shift }
        ).then((response) => {
            if (response.status === 200) {
                let newShift = response.data[0];
                let updatedArray = shifts.concat(newShift);
                setShifts(updatedArray);
                setDate("")
                setStart("")
                setFinish("")
                setBreakTime("")
            }
        })
            .catch((error) => {
                if (error.response.status === 422) {
                    alert("Date and times must be present");
                }
            })
    }

    const getDeparted = async (e) => {
        e.preventDefault();
        await axios.get("http://localhost:3000/users/" + userState.id +
            "/organizations/" + userState.organization_id + "/departed_shifts")
            .then((response) => {
                setShifts(response.data)
                setCurrent(false);
            });
    }

    const getCurrent = async (e) => {
        e.preventDefault();
        await axios.get("http://localhost:3000/users/" + userState.id + "/organizations/" + userState.organization_id + "/shifts")
            .then((response) => {
                setShifts(response.data);
                setCurrent(true);
            });
    }

    const editShift = (shift, user_id) => {
        console.log(shift)
            history.push({
                pathname: "/edit-shift",
                state: {
                    shift,
                    user_id
                }
            });
    }

    return (
        <div>
            {current ? <h4>Current Shifts</h4> : <h4>Departed Employees' Shifts</h4>}
            <table class="highlight">
                <thead>
                    <th>Employee Name</th>
                    <th>Shift Date</th>
                    <th>Start Time</th>
                    <th>Finish Time</th>
                    <th>Break Length (minutes)</th>
                    <th>Hours Worked</th>
                    <th>Shift Cost</th>
                </thead>

                <tbody>
                    {shifts.map((shift) => {
                        return (
                            <tr onClick={(e) => {editShift(shift)}}>
                                <Shift shift={shift} />
                            </tr>
                        );
                    })}
                    {current ?
                        <tr>
                            <td>{userState.name}</td>
                            <td><input type="date" value={date} onChange={(e) => { setDate(e.target.value) }} /></td>
                            <td><input type="time" value={start} onChange={(e) => { setStart(e.target.value) }} /></td>
                            <td><input type="time" value={finish} onChange={(e) => { setFinish(e.target.value) }} /></td>
                            <td><input type="number" min="0" value={breakTime} onChange={(e) => { setBreakTime(e.target.value) }} /></td>
                            <td>
                                <button class="btn-floating btn-medium waves-effect waves-light red" onClick={addShift}>
                                    <i class="material-icons">add</i>
                                </button>
                            </td>
                        </tr> : null}
                </tbody>
            </table>
            <button class="btn waves-effect waves-light white"><Link to="/organization-home">Home</Link></button>

            {
                current ? <button class="btn waves-effect waves-light" onClick={(e) => getDeparted(e)}>Prior Employee Shifts</button> :
                    <button class="btn waves-effect waves-light" onClick={(e) => getCurrent(e)}>Current Shifts</button>
            }
        </div>
    )
}
export default ShiftList;