import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card';
import styles from './Hand.module.scss'
import { removeCard } from '../../features/hand/handSlice';

export default function Hand() {
    const hand = useSelector((state) => state.hand.cards)
    const dispatch = useDispatch()

    return (
        <div className={styles.hand}>
            {hand.map((card, index) => {
                // console.log(card.id.toString() + index.toString())
                return <Card 
                    key={card.id.toString() + index.toString()}
                    classStyle="in-hand"
                    {...card}
                    onClick={() => console.log(removeCard({ index: index }))}
                />
            })}
            {/* <Card classStyle="in-hand"/>
            <Card classStyle="in-hand" />
            <Card classStyle="in-hand" />
            <Card classStyle="in-hand" />
            <Card classStyle="in-hand" /> */}
        </div>
    );
}