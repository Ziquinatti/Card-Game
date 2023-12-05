import styles from "./Deck.module.scss"
import { useState } from "react";

export default function Deck() {
    const [draw, setDraw] = useState(0);

    return (
        <div>
            <div className={styles.deck_base}></div>
            <div 
                className={styles.deck}
                onClick={() => setDraw(1)}
            >
                <p>TESTE</p>
            </div>
            <div 
                className={styles.card_anim}
                onClick={() => setDraw(2)}
                onAnimationEnd={() => { if (draw === 2) setDraw(0) }}
                draw={draw}
            >
                Carta1
            </div>
        </div>
    );
}