import styles from './Slots.module.scss'

import Slot from './Slot';
import Card from '../Card';
import { useSelector } from 'react-redux';

export default function Slots({ classStyle }){
    const slotsLen = useSelector((state) => state.slots.slotsLength)

    const playerSlotsCards = useSelector((state) => state.slots.allPlayerSlots)
    const opponentSlotsCards = useSelector((state) => state.slots.allOpponentSlots)

    let slotsCard
    if(classStyle === 'enemy')
        slotsCard = opponentSlotsCards
    else
        slotsCard = playerSlotsCards

    return (
        <div className={styles[classStyle]}>
            {[...Array(slotsLen)].map((x, index) => {

                let card = ''

                if (slotsCard[index] !== undefined) {
                    card = <Card 
                                dragIndex={index}
                                isNotDraggable={true}
                                classStyle="in-slot"
                                {...slotsCard[index]}
                                onClick={() => console.log(slotsCard[index].uuid)}
                            />
                }
                
                return (
                    <Slot 
                        key={index}
                        dropId={'slt-' + index}
                        isDroppable={card ? true : false}
                    >
                        {card}
                    </Slot>
                )
            })}
        </div>
    );
}