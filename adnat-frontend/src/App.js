import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './components/Login';
// import Organizations from './components/Organizations';
import Landing from './components/Landing';
import SignUp from './components/SignUp';

import UserContext from './components/context/UserContext';
import userState from './components/context/UserState';
import reducer from './components/context/UserReducer';
import { useReducer } from 'react';

function App() {
    return (
        <BrowserRouter>
            <UserContext.Provider value={useReducer(reducer, userState)}>
                <div class="container">
                    <div>
                        <Navbar />
                        <Route exact path="/" component={Login} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route exact path="/home" component={Landing} />
                    </div>
                </div>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
