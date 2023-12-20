import { Droppable } from "react-beautiful-dnd";
import styles from "./Slot.module.scss";

export default function Slot({ dropId, children, isDroppable }) {
    return (
        <Droppable 
            droppableId={dropId}
            isDropDisabled={isDroppable}
        >
            {(provided, snapshot) => (
                <div
                    className={styles.slot}
                    ref={provided.innerRef} {...provided.droppableProps}
                >
                    {children}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}