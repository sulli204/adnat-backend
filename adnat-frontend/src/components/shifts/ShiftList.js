import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Shift from './Shift'

const ShiftList = (props) => {
    const userState = props.location.state.userState;
    const [shifts, setShifts] = useState([]);
    const [date, setDate] = useState("");
    const [start, setStart] = useState("");
    const [finish, setFinish] = useState("");
    const [breakTime, setBreakTime] = useState("0");

    useEffect(() => {
        axios.get("http://localhost:3000/users/" + userState.id + "/organizations/" + userState.organization_id + "/shifts")
            .then((response) => {
                setShifts(response.data);
                console.log(shifts);
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
            {shift}
        ).then((response) => {
            if (response.status === 200) {
                let newShift = response.data;
                let updatedArray = shifts.concat(newShift);
                setShifts(updatedArray)
            }
        })
    }

    return (
        <div>
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
                    {shifts.map(shift => {
                        return (
                            <tr>
                                <Shift shift={shift} />
                            </tr>
                        );
                    })}
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
                    </tr>
                </tbody>
            </table>
            <button class="btn waves-effect waves-light"><Link to="/organization-home">Go Back</Link></button>
        </div>
    )
}
export default ShiftList;