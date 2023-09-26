import './bootstrap';
import '../css/app.scss'

import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import {Provider} from "react-redux";
import store from "./redux/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('app')).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home/> } />
            </Routes>
        </BrowserRouter>
    </Provider>
);
