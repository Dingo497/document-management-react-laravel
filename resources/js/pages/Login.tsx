import '../../css/pages/RegisterLogin.scss';

export default function Login() {

    return (
        <div className='container'>
            <div className='form'>
                <h1 className='auth-title'>Login</h1>
                <form className='login-form'>
                    <input type='text' name='username' placeholder='Username' />
                    <input type='text' name='password' placeholder='Password' />
                    <button type='submit' className='btn'>Login</button>
                    <p className='message'><a href='#'>Create an account</a></p>
                </form>
            </div>
        </div>
    );
}
