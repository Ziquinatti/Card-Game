import styles from "./Deck.module.scss";

import { useState, useEffect } from "react";

export default function Deck({ newRound, refillHand }) {
    const [draw, setDraw] = useState(0);

    const resetAnim = () => {
        setDraw(0);
        refillHand();
    }

    useEffect(() => {
        setDraw(1);
    }, [newRound]);

    return (
        <>
            <div className={styles.deck}>
                <span className={styles.effect}></span>
                <div className={styles.card_anim} draw={draw} onAnimationEnd={() => resetAnim()}>
                    <img className={styles.image} src={`${process.env.PUBLIC_URL}/assets/BackCard.png`} alt="deck_anim" />
                </div>
                <div className={styles.topCard}>
                    <img className={styles.image} src={`${process.env.PUBLIC_URL}/assets/BackCard.png`} alt="deck" />
                </div>
            </div>
            <button onClick={() => setDraw(1)} style={{ position: 'absolute', top: '20%', right: '10%'}}>Play Animation</button>
        </>
    );
}