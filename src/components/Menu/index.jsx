import styles from "./Menu.module.scss";

import { useState, useEffect } from "react";

export default function Menu() {
    const [menu, setMenu] = useState(true);
    const [closedStyle, setClosedStyle] = useState({});
    const [icon, setIcon] = useState("bi bi-chevron-double-right");

    useEffect(() => {
        if (menu) {
            setClosedStyle({
                transition: '1s',
                left: '-50rem'
            });
            setIcon("bi bi-chevron-double-right");
        } else {
            setClosedStyle({
                transition: '1s',
                left: '0'
            });
            setIcon("bi bi-chevron-double-left");
        }
    }, [menu]);

    const handleMenuButton = () => {
        setMenu(!menu);
    }

    return (
        <div className={styles.menu} style={closedStyle}>
            <h1>ELEMENTAL CARDS</h1>
            <button className={styles.button} onClick={handleMenuButton}><i className={icon}></i></button>
        </div>
    )
}