import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from './context/UserContext';
import OrganizationList from './organizations/OrganizationList';


const Landing = () => {
    const [userState, dispatch] = useContext(UserContext);

    const renderContent = () => {
        if (userState.organization_id == null) {
            return (
                <div>
                    <OrganizationList />
                </div>
            )
        }
        else {
            return (
                <Redirect to="/organization-home" />
            )
        }
    }

    return (
        <div>
            <div>Welcome, {userState.name}!</div>
            {renderContent()}
        </div>
    )
}

export default Landing;