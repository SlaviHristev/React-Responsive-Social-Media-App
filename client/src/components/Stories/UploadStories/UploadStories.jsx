import { useContext, useState } from 'react'
import styles from './UploadStories.module.css'
import { makeRequest } from '../../../axios';
import { useMutation, useQueryClient } from 'react-query';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DarkModeContext } from '../../../contexts/DarkModeContext';
import { AuthContext } from '../../../contexts/AuthContext';



export default function UploadStories({setAddStory, story}){
    const { darkMode } = useContext(DarkModeContext);
    const [uploadStory, setUploadStory] = useState(null);
    const {currentUser} = useContext(AuthContext);
    const upload = async (file) =>{
        try {
            const formData = new FormData();
            formData.append("file",file);
            const res = await makeRequest.post("/upload",formData);
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error)           
        }
    }

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newStory) => {
            return makeRequest.post("/stories", newStory);
        },
        {
            onSuccess: () => {
                
                queryClient.invalidateQueries(["stories"]);
            },
        }
    );

    const useRecordActivityMutation = () => {
        const queryClient = useQueryClient();
    
        return useMutation(
            (activityData) => {
                
                return makeRequest.post("/activities", activityData);
            },
            {
                onSuccess: () => {
                    
                    queryClient.invalidateQueries(["useractivities"]);
                },
            }
        );
    };

    const recordActivityMutation = useRecordActivityMutation()

    const handleSubmit = async (e) => {
        e.preventDefault();
        let storyUrl;
        const userId = currentUser.id;
        const activityDetails = `${currentUser.username} has added a story!`

        storyUrl = uploadStory ? await upload(uploadStory) : story.img;

        mutation.mutate({ img: storyUrl });
        setAddStory(false)

        recordActivityMutation.mutate({
            userId,
            activityDetails
        })
    };

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
                    <img src={
                            uploadStory
                            ? URL.createObjectURL(uploadStory)
                            : story.img
                        }
                        alt=''
                        />
                            <CloudUploadIcon className={styles.icon}/>
                    </div>
                </label>
                <input type="file" id='story' style={{display:'none'}} onChange={e =>setUploadStory(e.target.files[0])}/>
    
               
                </div>
                <button onClick={handleSubmit}>Upload</button>
            </form>
            <button className={styles.close} onClick={() => setAddStory(false)}>close</button>
            </div>
        </div> 
        </div>
    )
}