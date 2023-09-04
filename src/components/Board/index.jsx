import { DndContext } from "@dnd-kit/core";

import Slot from "../Slot";
import Card from "../Card";
import { useState } from "react";

import styles from "./Board.module.css";

export default function Board() {
    const [slot, setSlot] = useState([
        { idSlot: 0, idCard: null },
        { idSlot: 1, idCard: null },
        { idSlot: 2, idCard: null },
        { idSlot: 3, idCard: null },
    ]);

    const [card, setCard] = useState([
        { idCard: 'A' },
        { idCard: 'B' },
        { idCard: 'C' },
    ]);

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className={styles.board}>
                {slot.map(({idSlot, idCard}) => (
                    <Slot key={idSlot} id={idSlot}>
                        {idCard === null ?
                            <strong>{`Drop Here ${idSlot}`}</strong> :
                            <Card id={idCard}>{`Carta ${idCard}`}</Card>
                        }
                    </Slot>
                ))}
            </div>
            <div className={styles.hand}>
                {card.map(({idCard}) => (
                    <div key={idCard}>
                        {slot.find(slot => slot['idCard'] === idCard) === undefined ?
                            <Card id={idCard}>{`Carta ${idCard}`}</Card> :
                            null
                        }
                    </div>
                ))}
            </div>
        </DndContext>
    );

    function handleDragEnd(event) {
        console.log(event);
        const { over, active } = event;

        console.log(`Carta ${active.id} na Posicao ${over.id}`)

        slot[over.id].idCard = active.id;

        setSlot(slot);

        // parent[over.id] = active.id;

        // // console.log(parent);

        // setParent(parent);

        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        // setParent(over ? over.id : null);
    }
}