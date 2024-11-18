import styles from './Table.module.scss';

export default function Table({ children }) {
    return (
        <div className={styles.table} style={{
            backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/GreenBackground3.jpg'})`
        }}>
            {children}
        </div>
    )
}