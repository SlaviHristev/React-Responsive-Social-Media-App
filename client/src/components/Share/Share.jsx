import styles from './Share.module.css'
import Image from "../../assets/Image.png";
import Map from "../../assets/Map.png";
import Friend from "../../assets/Friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { DarkModeContext } from "../../contexts/DarkModeContext";
const Share = () => {
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");
    const { darkMode } = useContext(DarkModeContext);
    
    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const { currentUser } = useContext(AuthContext);

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newPost) => {
            return makeRequest.post("/posts", newPost);
        },
        {
            onSuccess: () => {
                
                queryClient.invalidateQueries(["posts"]);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        let imgUrl = "";
        if (file) imgUrl = await upload();
        mutation.mutate({ desc, img: imgUrl });
        setDesc("");
        setFile(null);
    };

    return (
        <div className={darkMode ? styles.lightMode : styles.darkMode}>
            <div className={styles.share}>
                <div className={styles.container}>
                    <div className={styles.top}>
                        <div className={styles.left}>
                            <img src={"/upload/" + currentUser.profilePic} alt="" />
                            <input
                                type="text"
                                placeholder={`What's on your mind ${currentUser.name}?`}
                                onChange={(e) => setDesc(e.target.value)}
                                value={desc}
                            />
                        </div>
                        <div className={styles.right}>
                            {file && (
                                <img className={styles.file} alt="" src={URL.createObjectURL(file)} />
                            )}
                        </div>
                    </div>
                    <hr />
                    <div className={styles.bottom}>
                        <div className={styles.left}>
                            <input
                                type="file"
                                id="file"
                                style={{ display: "none" }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <label htmlFor="file">
                                <div className={styles.item}>
                                    <img src={Image} alt="" />
                                    <span>Add Image</span>
                                </div>
                            </label>
                            <div className={styles.item}>
                                <img src={Map} alt="" />
                                <span>Add Place</span>
                            </div>
                            <div className={styles.item}>
                                <img src={Friend} alt="" />
                                <span>Tag Friends</span>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <button onClick={handleClick}>Share</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;