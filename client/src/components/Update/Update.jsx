import { useState } from 'react'
import styles from './Update.module.css'
import { makeRequest } from '../../axios';
import { useMutation, useQueryClient } from 'react-query';

export default function Update({setOpenUpdate, user}){

    const [cover,setCover] = useState(null);
    const [profile,setProfile] = useState(null);
    const [texts,setTexts] = useState({
        name:'',
        ciry:''
    })

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let coverUrl;
        let profileUrl;

        coverUrl = cover ? await upload(cover) : user.coverPic;
        profileUrl = profile ? await upload(profile) : user.profilePic;

        mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
        setOpenUpdate(false)
    };


    const handleChange = (e)=>{
        setTexts((prev) => ({...prev, [e.target.name]:[e.target.value]}))
    };

    return(
        <div className={styles.update}>
            Update
            <form >
                <input type="file" onChange={e =>setCover(e.target.files[0])}/>
                <input type="file" onChange={e => setProfile(e.target.files[0])}/>
                <input type="text" name='name' onChange={handleChange}/>
                <input type="text" name='city' onChange={handleChange}/>
                <button onClick={handleSubmit}>Update</button>
            </form>
            <button onClick={() => setOpenUpdate(false)}>X</button>
        </div> 
    )
}