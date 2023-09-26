import '../../css/pages/RegisterLogin.scss';

export default function Register() {

    return (
        <div className='container'>
            <div className='form'>
                <h1 className='auth-title'>Register</h1>
                <form  className='register-form'>
                    <input type='text' name='email' placeholder='Email' />
                    <input type='text' name='password' placeholder='Password' />
                    <button type='submit' className='btn'>Submit</button>
                    <p className='message'><a href='#'>Sign in</a></p>
                </form>
            </div>
        </div>
    );
}
