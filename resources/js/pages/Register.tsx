import '../../css/pages/RegisterLogin.scss';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerAction } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { AuthRegisterForm } from "../types/auth/authTypes";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [registerForm, setRegisterForm] = useState<AuthRegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm({ ...registerForm, [name]: value });
    }

    // @ts-ignore ts zas cosi nepozna tak place
    const handleSubmit = async (e) => {
        e.preventDefault();
        // @ts-ignore Malo by to byt kvoli tomu ze klasicky redux nechape trunk-u. Cize si mysli ze moze vzdy vratit
        // len objekt ale nieje to tak vdaka trunku mozem vraciat aj funckie nemam nato cas to riesit
        const response = await dispatch(registerAction(registerForm));
        if (response) {
            navigate('/dashboard');
        }
    }

    return (
        <div className='container'>
            <div className='form'>
                <h1 className='auth-title'>Register</h1>
                <form  className='register-form' onSubmit={handleSubmit}>
                    <input type='text' name='name' placeholder='Name'
                       value={registerForm?.name}
                       onChange={handleInputChange}
                    />
                    <input type='email' name='email' placeholder='Email'
                       value={registerForm?.email}
                       onChange={handleInputChange}
                    />
                    <input type='password' name='password' placeholder='Password'
                       value={registerForm?.password}
                       onChange={handleInputChange}
                    />
                    <input type='password' name='password_confirmation' placeholder='Repeat password'
                       value={registerForm?.password_confirmation}
                       onChange={handleInputChange}
                    />
                    <button type='submit' className='btn'>Submit</button>
                    <p className='message'>
                        <a href='#'>Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    );
}