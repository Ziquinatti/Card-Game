import styles from "./Card.module.scss";

export default function Card({ classStyle }) {
    return (
        <div className={styles[classStyle]}>
            Teste
        </div>
    );
}