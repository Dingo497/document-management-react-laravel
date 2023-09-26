import './bootstrap';
import '../css/app.scss'

import Register from './pages/Register';
import Login from "./pages/Login";

import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import store from "./redux/store";


ReactDOM.createRoot(document.getElementById('app')).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={ <Register/> } />
                <Route path="/login" element={ <Login/> } />
            </Routes>
        </BrowserRouter>
    </Provider>
);
