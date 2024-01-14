import { useState } from 'react'
import styles from './Update.module.css'

export default function Update({setOpenUpdate}){
    const [texts,setTexts] = useState({
        name:'',
        ciry:''
    })

    const handleChange = (e)=>{
        setTexts((prev) => ({...prev, [e.target.name]:[e.target.value]}))
    };

    return(
        <div className={styles.update}>
            Update
            <form >
                <input type="file" />
                <input type="file" />
                <input type="text" name='name' onChange={handleChange}/>
                <input type="text" name='city' onChange={handleChange}/>
            </form>
            <button onClick={() => setOpenUpdate(false)}>X</button>
        </div> 
    )
}