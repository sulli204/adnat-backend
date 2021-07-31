import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './components/Login';

function App() {
    return (
        <div class="container">
            <BrowserRouter>
                <div>
                    <Navbar />
                    <Login />
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
