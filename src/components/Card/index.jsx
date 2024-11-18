import styles from "./Card.module.scss";

import Icon from "../Icon";

import { useState, useEffect } from "react";

export default function Card({ card, location }) {
    const [transformStyle, setTransformStyle] = useState({});

    useEffect(() => {
        if (location === "board") {
            const rotation = Math.floor(Math.random() * 30 - 15); // rotação entre -15 e 15 graus
            const xOffset = Math.floor(Math.random() * 20 - 10); // deslocamento horizontal entre -10px e 10px
            const yOffset = Math.floor(Math.random() * 20 - 10); // deslocamento vertical entre -10px e 10px

            setTransformStyle({
                transform: `rotate(${rotation}deg) translate(${xOffset}px, ${yOffset}px)`,
            });
        }
    }, [location]);

    const cardClass = location === "hand" ? styles.cardInHand : styles.cardOnBoard;

    return (
        <div className={`${styles.card} ${cardClass}`} style={transformStyle}>
            <p className={styles.top}>{card.value}</p>
            <Icon where={"card"} suit={card.suit} />
            <p className={styles.bottom}>{card.value}</p>
        </div>
    );
}