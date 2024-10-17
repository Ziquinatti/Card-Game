import styles from "./Card.module.scss";

import { useState, useEffect } from "react";

export default function Card({ card, location }) {
    let icon = "";
    if (card.suit === 'fire') {
        icon = <i className={`${styles.icon} ${styles.fire} bi bi-fire`}></i>;

    } else if (card.suit === 'water') {
        icon = <i className={`${styles.icon} ${styles.water} bi bi-droplet-fill`}></i>;

    } else if (card.suit === 'air') {
        icon = <i className={`${styles.icon} ${styles.air} bi bi-wind`}></i>;

    } else if (card.suit === 'earth') {
        icon = <i className={`${styles.icon} ${styles.earth} bi bi-globe2`}></i>;

    } else if (card.suit === 'ice') {
        icon = <i className={`${styles.icon} ${styles.ice} bi bi-snow3`}></i>;

    } else if (card.suit === 'obsidian') {
        icon = <i className={`${styles.icon} ${styles.obsidian} bi bi-box-fill`}></i>;

    } else if (card.suit === 'tornado') {
        icon = <i className={`${styles.icon} ${styles.tornado} bi bi-tornado`}></i>;

    } else if (card.suit === 'tree') {
        icon = <i className={`${styles.icon} ${styles.tree} bi bi-tree-fill`}></i>;

    }

    const [transformStyle, setTransformStyle] = useState({});

    useEffect(() => {
        if (location === "board") {
            const rotation = Math.floor(Math.random() * 30 - 15); // rotação entre -15 e 15 graus
            const xOffset = Math.floor(Math.random() * 20 - 10); // deslocamento horizontal entre -10px e 10px
            const yOffset = Math.floor(Math.random() * 20 - 10); // deslocamento vertical entre -10px e 10px

            setTransformStyle({
                transform: `translate(-50%, -50%) rotate(${rotation}deg) translate(${xOffset}px, ${yOffset}px)`,
            });
        }
    }, [location]);

    const cardClass = location === "hand" ? styles.cardInHand : styles.cardOnBoard;

    return (
        <div className={`${styles.card} ${cardClass}`} style={transformStyle}>
            <p className={styles.top}>{card.value}</p>
            {icon}
            <p className={styles.bottom}>{card.value}</p>
        </div>
    );
}