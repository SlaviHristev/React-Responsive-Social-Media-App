import styles from './Message.module.css';


export default function Message({own}) {

    return (
        <div className={own ? styles.own : styles.message}>
            <div className={styles.messageTop}>
                <img className={styles.messageImg} src="https://images.pexels.com/photos/19991875/pexels-photo-19991875/free-photo-of-sight-mate.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <p className={styles.messageText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, amet sint id eos quisquam rerum! Minus, quos! Perferendis, dignissimos voluptatem?</p>
            </div>
            <div className={styles.messageBottom}>
                30 minutes ago
            </div>

        </div>
    )
}