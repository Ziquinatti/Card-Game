import { Draggable } from "react-beautiful-dnd";
import styles from "./Card.module.scss";

export default function Card({ classStyle, uuid, name, life, damage, onClick, dragIndex, isNotDraggable }) {
    return (
        <Draggable
            draggableId={uuid}
            index={dragIndex}
            isDragDisabled={isNotDraggable}
        >
            {(provided, snapshot) => (
                <div 
                    className={styles[classStyle]}
                    // onClick={onClick}
                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                >
                    <p>{uuid} / {name} / {life} / {damage}</p>
                    {/* <img className={styles.image} src="/assets/placeholder2.png" alt="carta"/> */}
                </div>
            )}
        </Draggable>
    );
}