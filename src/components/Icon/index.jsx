import styles from "./Icon.module.scss";

export default function Icon ({ where, suit, upsidedown }) {
    let icon = '';
    let color;

    switch (suit) {
        case "fire":
            icon = 'bi bi-fire';
            color = styles.fire;
            break;
        case "water":
            icon = 'bi bi-droplet-fill';
            color = styles.water;
            break;
        case "air":
            icon = 'bi bi-wind';
            color = styles.air;
            break;
        case "earth":
            icon = 'bi bi-globe2';
            color = styles.earth;
            break;

        case "tsunami":
            icon = 'bi bi-tsunami';
            color = styles.tsunami;
            break;
        case "sun":
            icon = 'bi bi-brightness-high';
            color = styles.sun;
            break;
        case "tornado":
            icon = 'bi bi-tornado';
            color = styles.tornado;
            break;
        case "land":
            icon = 'bi bi-image-alt';
            color = styles.land;
            break;
        
        case "ice":
            icon = 'bi bi-snow3';
            color = styles.ice;
            break;
        case "human":
            icon = 'bi bi-person-standing';
            color = styles.human;
            break;

        case "obsidian":
            icon = 'bi bi-box-fill';
            color = styles.obsidian;
            break;
        
        case "cloud":
            icon = 'bi bi-cloud-fill';
            color = styles.cloud;
            break;

        case "tree":
            icon = 'bi bi-tree-fill';
            color = styles.tree;
            break;
        case "stone":
            icon = 'bi bi-pentagon-half';
            color = styles.stone;
            break;

        default:
            break;
    }

    const iconStyle = where === "card" ? styles.iconInCard : styles.iconInAnim;
    const upSideDown = upsidedown ? styles.iconUpSideDown : '';

    return (
        <i className={`${iconStyle} ${upSideDown} ${color} ${icon}`}></i>
    );
}