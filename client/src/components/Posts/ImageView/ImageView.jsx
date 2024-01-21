import styles from './ImageView.module.css';

export default function ImageView({imageUrl, onClose}){

    return(
        <div className={styles.image}>
            <div className={styles.content}>
            <img src={'/upload/' + imageUrl} alt="" />
            <button className={styles.close} onClick={onClose}>Close</button>
            </div>
        </div>
    )
}