import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './components/Login';
import CreateOrganization from './components/organizations/CreateOrganization';
import Landing from './components/Landing';
import SignUp from './components/SignUp';

import UserContext from './components/context/UserContext';
import userState from './components/context/UserState';
import reducer from './components/context/UserReducer';
import { useReducer } from 'react';
import OrganizationHome from './components/organizations/OrganizationHome';
import ShiftList from './components/shifts/ShiftList';
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';

function App() {
    return (
        <BrowserRouter>
            <UserContext.Provider value={useReducer(reducer, userState)}>
                <div class="container">
                    <div>
                        <Navbar />
                        <Route exact path="/" component={Login} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route exact path="/landing" component={Landing} />
                        <Route exact path="/create-organization" component={CreateOrganization} />
                        <Route exact path="/organization-home" component={OrganizationHome} />
                        <Route exact path="/shifts" component={ShiftList} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/change-password" component={ChangePassword}/>
                    </div>
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
