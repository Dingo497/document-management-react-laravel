import './bootstrap';
import '../css/app.scss'

import Register from './pages/Register';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateDocument from "./pages/CreateDocument";
import AuthRoute from "./router/AuthRoute";

import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import store from "./redux/store";
import EditDocument from "./pages/EditDocument";


ReactDOM.createRoot(document.getElementById('app')).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/register" element={ <Register/> } />
                <Route path="/login" element={ <Login/> } />
                <Route
                    path="/dashboard"
                    element={
                        <AuthRoute>
                            <Dashboard/>
                        </AuthRoute>
                    }
                />
                <Route
                    path='/create-document'
                    element={
                        <AuthRoute>
                            <CreateDocument/>
                        </AuthRoute>
                    }
                />
                <Route
                    path='/edit-document/:documentID'
                    element={
                        <AuthRoute>
                            <EditDocument/>
                        </AuthRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </BrowserRouter>
    </Provider>
);
