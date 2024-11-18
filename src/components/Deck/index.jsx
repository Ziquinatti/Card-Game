import styles from "./Deck.module.scss";

import { useState, useEffect } from "react";

export default function Deck({ newRound, startRound }) {
    const [draw, setDraw] = useState(0);
    const [placeCard, setPlaceCard] = useState(0);

    // Fim das animações
    const resetAnim = () => {
        // Reseta as animações
        setDraw(0);
        setPlaceCard(0);

        // Inicia a nova rodada
        startRound();
    }

    // Rodada foi atualizada
    useEffect(() => {
        if (newRound <= 10) {
            // Não terminou o jogo -> Roda as animações
            setDraw(1);
            setPlaceCard(1);
        }
    }, [newRound]);

    return (
        <div className={styles.deck}>
            <div className={styles.cards}>
                <span className={styles.effect}></span>
                <div className={styles.card_anim} draw={draw} onAnimationEnd={() => resetAnim()}>
                    <img className={styles.image} src={`${process.env.PUBLIC_URL}/assets/BackCard.png`} alt="deck_anim" />
                </div>
                <div className={styles.card_anim2} placecard={placeCard}>
                    <img className={styles.image} src={`${process.env.PUBLIC_URL}/assets/BackCard.png`} alt="deck_anim2" />
                </div>
                <div className={styles.topCard}>
                    <img className={styles.image} src={`${process.env.PUBLIC_URL}/assets/BackCard.png`} alt="deck" />
                </div>
            </div>
        </div>
    );
}