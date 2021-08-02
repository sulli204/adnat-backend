import React, { useContext } from 'react';
import UserContext from './context/UserContext';

const Landing = () => {
    const [userState, dispatch] = useContext(UserContext);
    
    return(
        <div>Welcome, {userState.name}!</div>
    )
}

export default Landing;