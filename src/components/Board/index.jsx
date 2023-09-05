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

    function removeFromArray(idCard) {
        let newSlots = slot.map((item) => (
            item.idCard === idCard ?
                {
                    idSlot: item.idSlot,
                    idCard: null
                } :
                item
        ));

        return newSlots;
    }

    function handleDragEnd(event) {
        // console.log(event);
        const { over, active } = event;

        if (over) {
            console.log(`Carta ${active.id} na Posicao ${over.id}`)

            let newSlots = removeFromArray(active.id);
    
            newSlots = newSlots.map((item, j) => {
                return j === over.id ? 
                    {
                        idSlot: item.idSlot,
                        idCard: active.id
                    } : 
                    item
            })
            // console.log(newSlots);
            setSlot(newSlots);
        }
        else {
            setSlot(removeFromArray(active.id))
        }
    }
}