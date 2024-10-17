import styles from './Board.module.scss';
import Card from "../Card";

import { Droppable } from "react-beautiful-dnd";

export default function Board({ cards, points }) {
    points = 12345;
    return (
        <Droppable droppableId='board'>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className={styles.board}>
                    {cards.map((card, index) => (
                        <Card key={card.id} card={card} index={index} location="board"/>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}