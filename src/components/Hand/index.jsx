import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card';
import styles from './Hand.module.scss'
import { removeCard } from '../../features/hand/handSlice';
import { Droppable } from 'react-beautiful-dnd';

export default function Hand() {
    const hand = useSelector((state) => state.hand.cards)
    const dispatch = useDispatch()

    return (
        <Droppable 
            droppableId='hand'
            direction='horizontal'
        >
            {(provided, snapshot) => (
                <div 
                    className={styles.hand}
                    ref={provided.innerRef} {...provided.droppableProps}
                >
                    {hand.map((card, index) => {
                        return (
                            <Card 
                                key={card.uuid}
                                dragIndex={index}
                                isNotDraggable={false}
                                classStyle="in-hand"
                                {...card}
                                onClick={() => console.log(card.uuid)}
                            />
                        )
                        
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}