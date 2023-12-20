import styles from "./Deck.module.scss"
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { drawCard } from "../../features/hand/handSlice";

export default function Deck() {
    const [draw, setDraw] = useState(0);
    const dispatch = useDispatch()

    const drawAction = () => {
        if (draw === 2) {
            setDraw(0)
            console.log(drawCard({ id: 5, name: 'Teste', life: 10, damage: 5 }))
            dispatch(drawCard({ id: 5, name: 'Teste', life: 10, damage: 5 }))
        }
    }

    return (
        <div>
            <div className={styles.deck_base}></div>
            <div 
                className={styles.deck}
                onClick={() => setDraw(1)}
            >
                <img src="/assets/back_card_v2.png" alt="deck" style={{width: "100%", height: "100%"}}/>
            </div>
            <div 
                className={styles.card_anim}
                onClick={() => setDraw(2)}
                onAnimationEnd={() => drawAction()}
                draw={draw}
            >
                <img src="/assets/placeholder2.png" alt="deck" style={{width: "100%", height: "100%"}}/>
            </div>
        </div>
    );
}