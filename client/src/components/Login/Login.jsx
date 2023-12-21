import { Link } from 'react-router-dom'
import styles from './Login.module.css'
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export default function Login(){
    const {login} = useContext(AuthContext);

    const handleLogin = () =>{
        login();
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
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password"/>
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}