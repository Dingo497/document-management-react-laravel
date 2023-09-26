import '../../css/pages/RegisterLogin.scss';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { loginAction } from "../redux/actions/authActions";
import { AuthLoginForm } from "../types/auth/authTypes";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState<AuthLoginForm>({
        email: '',
        password: '',
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
        if (response) {
            navigate('/dashboard');
        }
    }

    return (
        <div className='container'>
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
                        <a href='#'>Create an account</a>
                    </p>
                </form>
            </div>
        </div>
    );
}
