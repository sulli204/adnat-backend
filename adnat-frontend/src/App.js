import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Organizations from './components/Organizations';

import UserContext from './components/context/UserContext';
import userState from './components/context/UserState';
import reducer from './components/context/UserReducer';
import { useReducer } from 'react';

function App() {
    return (
        <UserContext.Provider value={useReducer(reducer, userState)}>
            <div class="container">
                <BrowserRouter>
                    <div>
                        <Navbar />
                        <Login />
                        <Route exact path="/organizations" component={Organizations} />
                    </div>
                </BrowserRouter>
            </div>
        </UserContext.Provider>
    );
}

export default App;
