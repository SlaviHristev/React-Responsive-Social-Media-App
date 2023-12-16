import { Link } from 'react-router-dom'
import styles from './Register.module.css'

export default function Register(){
    return(
        
        <div className={styles.register}>
            <div className={styles.card}>
                <div className={styles.left}>
                    <h1>Social App</h1>
                    <p>This is an Social Media App project.</p>
                    <span>Do you have an account?</span>
                    <Link to={'/login'}>
                    <button>Login</button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <h1>Register</h1>
                    <form>
                        <input type="text" placeholder="Username" />
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <input type="text" placeholder="Name"/>
                        
                        <button>Register</button>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}