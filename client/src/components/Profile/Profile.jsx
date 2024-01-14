import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import Posts from '../Posts/Posts'

import styles from './Profile.module.css'
import { DarkModeContext } from '../../contexts/DarkModeContext';
import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Update from '../Update/Update';

export default function Profile() {
    const [openUpdate,setOpenUpdate] = useState(false)
    const { darkMode } = useContext(DarkModeContext);
    const { currentUser } = useContext(AuthContext)
    const userId = parseInt(useLocation().pathname.split("/")[2]);

    const { isLoading, error, data } = useQuery(["user"], () =>
      makeRequest.get("/users/find/" + userId).then((res) => {
        return res.data;
      })
    );
  
    const { isLoading: rIsLoading, data: relationshipData } = useQuery(
      ["relationship"],
      () =>
        makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
          return res.data;
        })
    );
  
    const queryClient = useQueryClient();
  
    const mutation = useMutation(
      (following) => {
        if (following)
          return makeRequest.delete("/relationships?userId=" + userId);
        return makeRequest.post("/relationships", { userId });
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["relationship"]);
        },
      }
    );
  
    const handleClick = () => {
      mutation.mutate(relationshipData.includes(currentUser.id));
    };

    return (
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
            <div className={styles.profile}>
                {isLoading ? "Loading..." : <>
                
                <div className={styles.images}>
                    <img src={"/upload/"+data.coverPic} alt="" className={styles.cover} />
                    <img src={"/upload/"+data.profilePic} alt="" className={styles.profilePic} />
                </div>
                <div className={styles.profileContainer}>
                    <div className={styles.userInfo}>
                        <div className={styles.left}>
                            <a href="http://facebook.com">
                                <FacebookIcon fontSize='large' />
                            </a>
                            <a href="http://instagram.com">
                                <InstagramIcon fontSize='large' />
                            </a>
                            <a href="http://twitter.com">
                                <TwitterIcon fontSize='large' />
                            </a>
                            <a href="http://linkedin.com">
                                <LinkedInIcon fontSize='large' />
                            </a>
                        </div>
                        <div className={styles.center}>
                            <span>{data.name}</span>
                            <div className={styles.info}>
                                <div className={styles.item}>
                                    <LocationOnIcon fontSize='small' />
                                    <span>{data.city}</span>
                                </div>
                            </div>
                            {rIsLoading ? ("Loading") : userId === currentUser.id
                                ? <button onClick={()=> setOpenUpdate(true)}>Update</button>
                                : <button onClick={handleClick}>{relationshipData.includes(currentUser.id) ? "Following" : "Follow"}</button>}
                        </div>
                        <div className={styles.right}>
                            <EmailIcon fontSize='large' />
                            <MoreVertIcon fontSize='large' />
                        </div>
                    </div>
                    {<Posts userId={userId} />}
                </div>
                </>}
                {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
            </div>         
        </div>
    )
}