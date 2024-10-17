import styles from './PlayerHand.module.scss'
import Card from '../Card';

import { Draggable, Droppable } from 'react-beautiful-dnd';

export default function PlayerHand({ cards }) {
    return (
        <Droppable droppableId={'hand'} direction='horizontal'>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className={styles.playerHand}>
                    {cards.map((card, index) => (
                        <Draggable key={card.id} draggableId={card.suit + card.value} index={index}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <Card card={card} location="hand"/>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}