import styles from './Slots.module.scss'

import Slot from './Slot';
import Card from '../Card';

export default function Slots({ classStyle }){
    return (
        <div className={styles[classStyle]}>
            <Slot>
                <Card classStyle="in-slot"/>
            </Slot>
            <Slot>

            </Slot>
            <Slot>
                <Card classStyle="in-slot"/>
            </Slot>
            <Slot>
                
            </Slot>
        </div>
    );
}