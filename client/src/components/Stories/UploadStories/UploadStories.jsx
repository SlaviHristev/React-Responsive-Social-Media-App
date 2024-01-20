import { useContext, useState } from 'react'
import styles from './UploadStories.module.css'
import { makeRequest } from '../../../axios';
import { useMutation, useQueryClient } from 'react-query';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DarkModeContext } from '../../../contexts/DarkModeContext';



export default function UploadStories({setAddStory}){
    const { darkMode } = useContext(DarkModeContext);
    const [uploadStory, setUploadStory] = useState(null);

    const upload = async (file) =>{
        try {
            const formData = new FormData();
            formData.append("file",file);
            const res = await makeRequest.post("/upload",formData);
            return res.data;
        } catch (error) {
            console.log(error)           
        }
    }

    return(
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
        <div className={styles.update}>
            <div className={styles.wrapper}>
            <h1>Upload Story</h1>
            <form >
                <div className={styles.files}>
                <label htmlFor="story">
                    <span>Story</span>
                    <div className={styles.imgContainer}>
                        
                            <CloudUploadIcon className={styles.icon}/>
                    </div>
                </label>
    
               
                </div>
                <button>Upload</button>
            </form>
            <button className={styles.close} onClick={() => setAddStory(false)}>close</button>
            </div>
        </div> 
        </div>
    )
}