import styles from './Board.module.scss';

import Card from "../Card";
import Icon from '../Icon';

import { Droppable } from "react-beautiful-dnd";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCard } from '../../data/board/boardSlice';

export default function Board({ combine }) {
    const board = useSelector((state) => state.board.cards);
    const dispatch = useDispatch();

    const [combineAnim, setCombineAnim] = useState(0);
    const [effectAnim, setEffectAnim] = useState(0);

    const [icon1, setIcon1] = useState('');
    const [icon2, setIcon2] = useState('');

    function getIconsCombine(board) {
        const tmpBoard = board;
        const len = board.length;

        setIcon1(tmpBoard[len - 1]);
        setIcon2(tmpBoard[len - 2]);
    }

    function combinationEnd(end) {
        if (end === 1) {
            setCombineAnim(0);
            setEffectAnim(1);
            dispatch(addCard(combine));
        } else if (end === 2) {
            setEffectAnim(0);
        }
    }

    useEffect(() => {
        if (combine !== null) {
            getIconsCombine(board);

            setCombineAnim(1);
        }
    }, [combine]);

    return (
        <Droppable droppableId='board'>
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className={styles.board}>
                    <div className={styles.spiral} combine={combineAnim} onAnimationEnd={() => combinationEnd(1)}>
                        <Icon where={"anim"} suit={icon1.suit} />
                        <Icon where={"anim"} suit={icon2.suit} upsidedown />
                    </div>
                    <div className={styles.burn} effect={effectAnim} onAnimationEnd={() => combinationEnd(2)}></div>
                    {board.map((card, index) => (
                        <Card key={card.id} card={card} index={index} location="board"/>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}