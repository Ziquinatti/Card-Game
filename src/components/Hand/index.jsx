import Card from '../Card';
import styles from './Hand.module.scss'

export default function Hand() {
    return (
        <div className={styles.hand}>
            <Card classStyle="in-hand" />
            <Card classStyle="in-hand" />
            <Card classStyle="in-hand" />
            <Card classStyle="in-hand" />
            <Card classStyle="in-hand" />
        </div>
    );
}