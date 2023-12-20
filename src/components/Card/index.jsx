import styles from "./Card.module.scss";

export default function Card({ classStyle, id, name, life, damage, onClick }) {
    return (
        <div className={styles[classStyle]} onClick={onClick}>
            <p>{id} / {name} / {life} / {damage}</p>
            {/* <img className={styles.image} src="/assets/placeholder2.png" alt="carta"/> */}
        </div>
    );
}