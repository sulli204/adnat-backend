import React from 'react';

const Shift = ({shift}) => {
    return (
        <>
            <td>{shift.name}</td>
            <td>{shift.date}</td>
            <td>{shift.start}</td>
            <td>{shift.finish}</td>
            <td>{shift.break}</td>
            <td>{shift.hours}</td>
            <td>{shift.shift_cost}</td>
        </>
    )
}
export default Shift;