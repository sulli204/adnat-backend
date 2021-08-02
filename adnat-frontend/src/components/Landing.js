import React, { useContext } from 'react';
import UserContext from './context/UserContext';
import Organizations from './organizations/Organizations';

const Landing = () => {
    const [userState, dispatch] = useContext(UserContext);

    return (
        <div>
            <div>Welcome, {userState.name}!</div>
            <Organizations />
        </div>
    )
}

export default Landing;