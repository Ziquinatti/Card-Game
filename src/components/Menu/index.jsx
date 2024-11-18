import styles from "./Menu.module.scss";

import { useState, useEffect } from "react";

export default function Menu() {
    const [menu, setMenu] = useState(true);
    const [closedStyle, setClosedStyle] = useState({});
    const [backgroundFade, setBackgroundFade] = useState({});
    const [icon, setIcon] = useState("bi bi-chevron-double-right");

    useEffect(() => {
        if (menu) {
            setClosedStyle({
                transition: '1s',
                left: '-50rem'
            });
            setBackgroundFade({
                transition: '1s',
                opacity: '0',
                visibility: 'hidden'
            });
            setIcon("bi bi-chevron-double-right");
        } else {
            setClosedStyle({
                transition: '1s',
                left: '0'
            });
            setBackgroundFade({
                transition: '1s',
                opacity: '0.5',
                visibility: 'visible'
            });
            setIcon("bi bi-chevron-double-left");
        }
    }, [menu]);

    const handleMenuButton = () => {
        setMenu(!menu);
    }

    return (
        <div className={styles.menu}>
            <span className={styles.background} style={backgroundFade}></span>
            <div className={styles.rules} style={closedStyle}>
                <h1>ELEMENTAL CARDS</h1>
                <button className={styles.button} onClick={handleMenuButton}><i className={icon}></i></button>
            </div>
        </div>
    )
}