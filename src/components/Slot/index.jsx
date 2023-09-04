import { useDroppable } from "@dnd-kit/core";

import styles from "./Slot.module.css";

export default function Slot({ children, id }) {
    const {isOver, setNodeRef} = useDroppable({
        id: id,
    });

    const style = {
        color: isOver ? 'green' : undefined,
    };

    return (
        <div ref={setNodeRef} style={style} className={styles.slot}>
            { children }
        </div>
    );
}