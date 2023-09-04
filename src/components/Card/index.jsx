import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import styles from "./Card.module.css";

export default function Card({ children, id }) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id,
    });

    const style = transform ? {
        // Movimentando o objeto

        // transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transform: CSS.Translate.toString(transform),
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} className={styles.card} {...listeners} {...attributes}>
            { children }
        </div>
    );
}