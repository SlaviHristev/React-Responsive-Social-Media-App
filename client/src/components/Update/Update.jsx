import { useContext, useState } from 'react'
import styles from './Update.module.css'
import { makeRequest } from '../../axios';
import { useMutation, useQueryClient } from 'react-query';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DarkModeContext } from '../../contexts/DarkModeContext';


export default function Update({setOpenUpdate, user}){

    const [cover,setCover] = useState(null);
    const [profile,setProfile] = useState(null);
    const [texts,setTexts] = useState({
        email: user.email,
        password: user.password,
        name:user.name,
        city:user.city
    })
    const { darkMode } = useContext(DarkModeContext);

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

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (user) => {
            return makeRequest.put("/users", user);
        },
        {
            onSuccess: () => {
                
                queryClient.invalidateQueries(["user"]);
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
        let coverUrl;
        let profileUrl;

        coverUrl = cover ? await upload(cover) : user.coverPic;
        profileUrl = profile ? await upload(profile) : user.profilePic;

        const userId = user.id;
        const activityDetails = `${user.username} has updated their profile!`

        mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
        setOpenUpdate(false)
        
       recordActivityMutation.mutate({
            userId,
            activityDetails
       })
    };


    const handleChange = (e)=>{
        setTexts((prev) => ({...prev, [e.target.name]:[e.target.value]}))
    };

    return(
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
        <div className={styles.update}>
            <div className={styles.wrapper}>
            <h1>Update Your Profile</h1>
            <form >
                <div className={styles.files}>
                <label htmlFor="cover">
                    <span>Cover Picture</span>
                    <div className={styles.imgContainer}>
                        <img src={
                            cover
                            ? URL.createObjectURL(cover)
                            : "/upload/" + user.coverPic
                        }
                        alt=''
                        />
                        <CloudUploadIcon className={styles.icon}/>
                    </div>
                </label>
                <input type="file" id='cover' style={{display:'none'}} onChange={e =>setCover(e.target.files[0])}/>
                <label htmlFor="profile">
                    <span>Profile Picture</span>
                    <div className={styles.imgContainer}>
                        <img src={
                            profile
                            ? URL.createObjectURL(profile)
                            : "/upload/" + user.profilePic}
                            alt="" />
                            <CloudUploadIcon className={styles.icon}/>
                    </div>
                </label>
                <input type="file" id='profile' style={{display: 'none'}} onChange={e => setProfile(e.target.files[0])}/>
                </div>
                <label>Email</label>
                <input type="text" value={texts.email} name='email' onChange={handleChange}/>
                <label>Password</label>
                <input type="text" value={texts.password} name='password' onChange={handleChange}/>
                <label>Name</label>
                <input type="text" name='name' value={texts.name} onChange={handleChange} />
                <label>Country / City</label>
                <input type="text" name="city" value={texts.city} onChange={handleChange}/>
                <button onClick={handleSubmit}>Update</button>
            </form>
            <button className={styles.close} onClick={() => setOpenUpdate(false)}>close</button>
            </div>
        </div> 
        </div>
    )
}