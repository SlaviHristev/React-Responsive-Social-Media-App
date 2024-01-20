import { useContext, useState } from 'react'
import styles from './Stories.module.css'
import { AuthContext } from '../../contexts/AuthContext'
import UploadStories from './UploadStories/UploadStories';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../../axios';
import ViewStory from './ViewStory/ViewStory';



export default function Stories() {
    const { currentUser } = useContext(AuthContext);
    const [addStory, setAddStory] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const queryClient = useQueryClient();
    const openViewer = (story) =>{
        setSelectedStory(story);
        setIsViewerOpen(true);
    };

    const closeViewer = () =>{
        setSelectedStory(null);
        setIsViewerOpen(false);
    }
    
    const userId = currentUser ? currentUser.id : null;
    const { isLoading, error, data } = useQuery(['stories'], () =>
    makeRequest.get("/stories?userId=" + userId).then((res) => {
        console.log(currentUser);
        return res.data
    })
)
const deleteMutation = useMutation(
    (storyId) =>{
        return makeRequest.delete("/stories/" + storyId);
    },
    {
        onSuccess: () => {
            
            queryClient.invalidateQueries(["stories"]);
          },
    }
)

const handleDelete = (storyId) =>{
    deleteMutation.mutate(storyId);
    setIsViewerOpen(false);
}

    return (

        <div className={styles.stories}>
            <div className={styles.story}>
                <img src={"/upload/" + currentUser.profilePic} alt="" />
                <span>{currentUser.name}</span>
                <button onClick={() => setAddStory(!addStory)}>+</button>
            </div>
            {error ? "Something went wrong!" :
                isLoading
                    ? "Loading"
                    : data.map(story => (
                        <div className={styles.story} key={story.id} onClick={() => openViewer(story)}>
                            <img src={"/upload/" + story.img} alt="" />
                            <span>{story.name}</span>
                        </div>

                    ))}
            {addStory && <UploadStories setAddStory={setAddStory} story={data}/>}
            {isViewerOpen && <ViewStory story={selectedStory} onClose={closeViewer} currentUser={currentUser} onDelete={handleDelete}/>}
            
        </div>
    )
}