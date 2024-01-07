import { Link, useNavigate } from 'react-router-dom'
import styles from './Login.module.css'
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export default function Login(){
    const {login} = useContext(AuthContext);

    const [inputs, setInputs] = useState({
        username:"",
        password:"",
    });
    const [err, setErr] = useState(null);

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setInputs(prev=>({...prev, [e.target.name]:e.target.value}));
        
    }
    const handleLogin = async(e) =>{
        e.preventDefault()
        try {
            await login(inputs)
            navigate('/')
        } catch (error) {
            setErr(error.response.data)
        }
    }
    return(
        
        <div className={styles.login}>
            <div className={styles.card}>
                <div className={styles.left}>
                    <h1>Welcome</h1>
                    <p>This is an Social Media App project.</p>
                    <span>Don't have an account?</span>
                    <Link to={'/register'}>
                    <button>Register</button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="Username" name='username' onChange={handleChange}/>
                        <input type="password" placeholder="Password" name='password' onChange={handleChange}/>
                        {err && err}
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}