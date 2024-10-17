import styles from "./Status.module.scss";

export default function Status({ points, round }) {
    return (
        <div className={styles.status}>
            <p>RODADA <br/> {round} / 10</p>
            <p>{points.toString().padStart(10, '0')}</p>
        </div>
    );
}