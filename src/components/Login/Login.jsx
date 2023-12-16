import styles from './Login.module.css'

export default function Login(){
    return(
        
        <div className={styles.login}>
            <div className={styles.card}>
                <div className={styles.left}>
                    <h1>Welcome</h1>
                    <p>This is an Social Media App project.</p>
                    <span>Don't have an account?</span>
                    <button>Register</button>
                </div>
                <div className={styles.right}>
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password"/>
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}