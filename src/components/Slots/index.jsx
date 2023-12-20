import styles from './Slots.module.scss'

import Slot from './Slot';
import Card from '../Card';
import { useSelector } from 'react-redux';

export default function Slots({ classStyle }){
    const slotsLen = useSelector((state) => state.slots.slotsLength)
    const slotsCard = useSelector((state) => state.slots.allSlots)

    return (
        <div className={styles[classStyle]}>
            {[...Array(slotsLen)].map((x, index) => {

                let card = ''

                if (slotsCard[index] !== undefined) {
                    card = <Card 
                                key={slotsCard[index].id}
                                classStyle="in-slot"
                                {...slotsCard[index]}
                            />
                }
                
                return (
                    <Slot key={index}>
                        {card}
                    </Slot>
                )
            })}
            {/* <Slot>
                <Card classStyle="in-slot" cardId={2}/>
            </Slot>
            <Slot>

            </Slot>
            <Slot>
                <Card classStyle="in-slot" cardId={3}/>
            </Slot>
            <Slot>
                
            </Slot> */}
        </div>
    );
}