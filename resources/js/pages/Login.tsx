import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/actions/authActions";

import { AuthLoginFormType } from "../types/authTypes";
import { alertDataType } from '../types/globalTypes';
import Alert from "../components/Alert";


export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState<AuthLoginFormType>({
        email: '',
        password: '',
    });
    const [alert, setAlert] = useState<alertDataType>({
        type: 'danger',
        title: '',
        messages: []
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginForm({ ...loginForm, [name]: value });
    }

    // @ts-ignore
    const handleSubmit = async (e) => {
        e.preventDefault();
        // @ts-ignore
        const response = await dispatch(loginAction(loginForm));
        if (!response.errors) {
            navigate('/dashboard');
        } else {
            setAlert({
                type: 'danger',
                title: 'ERROR',
                messages: response.errors
            });
        }
    }

    return (
    <>
        <div className='form'>
            <h1 className='auth-title'>Login</h1>
            <form className='login-form' onSubmit={handleSubmit}>
                <input type='email' name='email' placeholder='Email'
                   value={loginForm?.email}
                   onChange={handleInputChange}
                />
                <input type='password' name='password' placeholder='Password'
                   value={loginForm?.password}
                   onChange={handleInputChange}
                />
                <button type='submit' className='btn'>Login</button>
                <p className='message'>
                    <Link to="/register">Create an account</Link>
                </p>
            </form>
        </div>
        <Alert
            type={alert.type}
            title={alert.title}
            messages={alert.messages}
        />
    </>
    );
}
