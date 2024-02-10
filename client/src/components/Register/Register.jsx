import { Link, useNavigate } from 'react-router-dom'
import styles from './Register.module.css'
import { useState } from 'react';
import axios from "axios";

export default function Register(){
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:"",
        name:""
    });

    const [err, setErr] = useState(null);

    const handleChange = (e) =>{
        setInputs(prev=>({...prev, [e.target.name]:e.target.value}));
        
    }

    const handleClick = async (e) =>{
        e.preventDefault();

        try {
          await axios.post("http://localhost:5000/api/auth/register", inputs);
            navigate('/login')
        } catch (err) {
            setErr(err.response.data)
        }
    }
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
                        <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                        <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
                        <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                        <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
                        
                        {err && err}
                        <button onClick={handleClick}>Register</button>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}