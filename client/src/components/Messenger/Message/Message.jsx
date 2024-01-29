import styles from './Message.module.css';
import moment from 'moment'

export default function Message({ message, own }) {
    const formattedTimestamp = moment(message.created_at).format('MMM D, YYYY [at] h:mm A');

    return (
        <div className={own ? styles.own : styles.message}>
            <div className={styles.messageTop}>
                <img className={styles.messageImg} src="" alt="" />
                <p className={styles.messageText}>{message.text}</p>
            </div>
            <div className={styles.messageBottom}>
                {formattedTimestamp}
            </div>
        </div>
    );
}