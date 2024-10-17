import styles from './Table.module.scss';

export default function Table({ children,  round, points }) {
    points = 12345;
    round = 4;

    round = (round === 10)? "FINAL ROUND" : `Rounds: ${round} / 10`;

    return (
        <div className={styles.table} style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/GreenBackground3.jpg'})`
        }}>
            {children}
        </div>
    )
}