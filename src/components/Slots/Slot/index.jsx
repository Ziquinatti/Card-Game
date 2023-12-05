import styles from "./Slot.module.scss";

export default function Slot({ children }) {
    return (
        <div className={styles.slot}>
            {children}
        </div>
    );
}