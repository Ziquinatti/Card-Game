import { DragDropContext } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Deck from "./components/Deck";
import PlayerHand from "./components/PlayerHand";
import Table from "./components/Table";
import Board from "./components/Board";
import Menu from "./components/Menu";
import Status from "./components/Status";


// const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const suits = ['fire', 'water', 'air', 'earth'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const combinations = {
    "water-water": (A, B) => A * B,
    "water-fire": (A, B) => A - B,
    "water-air": (A, B) => (A + B) * 2, // ICE
    "water-earth": (A, B) => A + B,

    "fire-water": (A, B) => (A + B) * 3, // OBSIDIAN
    "fire-fire": (A, B) => 0,
    "fire-air": (A, B) => A * B,
    "fire-earth": (A, B) => A - B,

    "air-water": (A, B) => (A + B) / 2,
    "air-fire": (A, B) => (A + B) / 2,
    "air-air": (A, B) => (A + B) * 2, // TORNADO
    "air-earth": (A, B) => 0,

    "earth-water": (A, B) => (A + B) * 2, // TREE
    "earth-fire": (A, B) => A * B,
    "earth-air": (A, B) => A - B,
    "earth-earth": (A, B) => A + B,

    "ice-fire": (A, B) => A - B,        // -> water

    "tornado-earth": (A, B) => A * B,   // -> air

    "tree-water": (A, B) => A * B,      // -> tree
    "tree-fire": (A, B) => A - B,       // -> fire
    "tree-earth": (A, B) => A + B,      // -> earth
};

function generateDeck() {
    let deck = [];
    let id = 0;
    
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ id, value, suit });
            id++;
        }
    }

    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
}

function getNumericValue(cardValue) {
    switch (cardValue) {
        case 'J': return 11;
        case 'Q': return 12;
        case 'K': return 13;
        case 'A': return 14;
        default: return parseInt(cardValue);
    }
}

function calculatePoints(topCard, playedCard) {
    const key = `${topCard.suit}-${playedCard.suit}`;

    const A = getNumericValue(topCard.value);
    const B = getNumericValue(playedCard.value);

    if (combinations[key]) {

        const addPoints = Math.ceil(combinations[key](A, B));

        if (key === 'water-air') return { addPoints, newElement: "ice" };
        if (key === 'fire-water') return { addPoints, newElement: "obsidian" };
        if (key === 'air-air') return { addPoints, newElement: "tornado" };
        if (key === 'earth-water') return { addPoints, newElement: "tree" };

        return { addPoints };
    }

    return { addPoints: B };
}

const move = (sourceItems, destinationItems, source, destination) => {
    const sourceItemsClone = [...sourceItems];
    const destItemsClone = [...destinationItems];

    const [removed] = sourceItemsClone.splice(source.index, 1);

    destItemsClone.push(removed);

    const result = {};
    result[source.droppableId] = sourceItemsClone;
    result[destination.droppableId] = destItemsClone;

    return result;
};

export default function App() {
    const [deck, setDeck] = useState(shuffleDeck(generateDeck()));
    const [playerHand, setPlayerHand] = useState([]);
    const [boardCards, setBoardCards ] = useState([]);
    const [round, setRound] = useState(0);
    const [points, setPoints] = useState(0);

    function dealCard(currentDeck) {
        const newDeck = [...currentDeck];
        const drawnCard = newDeck.shift();
        return { drawnCard, newDeck };
    }

    function refillHand() {
        const newHand = [...playerHand];
        let currentDeck = [...deck];

        while (newHand.length < 4 && deck.length > 0) {
            const { drawnCard, newDeck } = dealCard(currentDeck);
            newHand.push(drawnCard);
            currentDeck = newDeck;
        }

        setDeck(currentDeck);
        setPlayerHand(newHand);
    }

    function startRound() {
        if (round > 10 || deck.length <= 0) return; // Game Over

        const newBoard = [...boardCards];
        let currentDeck = [...deck];

        const { drawnCard, newDeck } = dealCard(currentDeck);
        newBoard.push(drawnCard);
        currentDeck = newDeck;

        setDeck(currentDeck);
        setBoardCards(newBoard);
    }

    const onDragEnd = ({ source, destination }) => {
        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        if (source.droppableId === 'hand' && destination.droppableId === 'board') {
            const result = move(playerHand, boardCards, source, destination);
            setPlayerHand(result.hand);
            setBoardCards(result.board);

            const lenBoard = result.board.length;
            const { addPoints, newElement } = calculatePoints(result.board[lenBoard-2], result.board[lenBoard-1]);

            console.log(addPoints);
            
            if (newElement !== undefined) {
                console.log(newElement);
                const newBoard = [...boardCards];
                newBoard.push({ id: uuid(), value: addPoints, suit: newElement });
                setBoardCards(newBoard);
            }

            setPoints(points + addPoints);
        }
    };

    useEffect(() => {
        if (playerHand.length === 0) {
            setBoardCards([]);

            setRound(round + 1);
            startRound();
        }
    }, [playerHand]);

    return (
        <>
            <Menu />
            <Table>
                <Status round={round} points={points}/>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Board cards={boardCards} />
                        <PlayerHand cards={playerHand} />
                    </DragDropContext>
                    <Deck newRound={round} refillHand={refillHand}/>
                </div>
            </Table>
        </>
    );
}