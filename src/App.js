import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Deck from "./components/Deck";
import PlayerHand from "./components/PlayerHand";
import Table from "./components/Table";
import Board from "./components/Board";
import Menu from "./components/Menu";
import Status from "./components/Status";

import { addCard, clear } from './data/board/boardSlice';

import combinationsData from "./data/combinations.json";

import { DragDropContext } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useSelector, useDispatch } from "react-redux";

// Naipes e Valores iniciais
const suits = ['fire', 'water', 'air', 'earth'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Cria o deck inicial
function generateDeck() {
    let deck = [];
    
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ id: uuid(), value, suit });
        }
    }

    return deck;
}

// Embaralha o deck
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

function simpleParser(formula, A, B) {
    // Substitui as variáveis A e B nos cálculos
    const parsedFormula = formula.replace('A', A).replace('B', B);
    
    return Function('"use strict"; return (' + parsedFormula + ')')();
}

export default function App() {
    const dispatch = useDispatch();

    const boardCards = useSelector((state) => state.board.cards);

    const [deck, setDeck] = useState(shuffleDeck(generateDeck()));
    const [playerHand, setPlayerHand] = useState([]);

    const [combine, setCombine] = useState(null);

    const [points, setPoints] = useState(0);
    
    const [round, setRound] = useState(1);
    const [counter, setCounter] = useState(5);
    const [isRoundOver, setIsRoundOver] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);

    // Remove carta do deck
    function dealCard(currentDeck) {
        const newDeck = [...currentDeck];
        const drawnCard = newDeck.shift();
        return { drawnCard, newDeck };
    }

    // Entrega as cartas para o jogador
    function refillHand(currentDeck) {
        // Recupera as cartas da mão do jogador
        const newHand = [...playerHand];

        // Entrega 4 cartas para o jogador
        while (newHand.length < 4 && deck.length > 0) {
            const { drawnCard, newDeck } = dealCard(currentDeck);
            newHand.push(drawnCard);
            currentDeck = newDeck;
        }

        // Atualiza o estado do deck e da mão
        setDeck(currentDeck);
        setPlayerHand(newHand);
    }

    // Inicia uma nova rodada
    function startRound() {
        if (round > 10 || deck.length <= 0) return; // Fim de Jogo

        // Coloca a carta do topo no tabuleiro
        const { drawnCard, newDeck } = dealCard(deck);

        dispatch(addCard(drawnCard));

        // Envia o deck atualizado
        refillHand(newDeck);
    }

    // Calcula os pontos após jogada uma carta
    function calculatePoints(topCard, playedCard) {
        const key = `${topCard.suit}-${playedCard.suit}`;
    
        const A = getNumericValue(topCard.value);
        const B = getNumericValue(playedCard.value);
    
        const combination = combinationsData[key];
    
        if (combination && combination.formula) {
    
            const addPoints = simpleParser(combination.formula, A,  B);
    
            return { addPoints, newElement: combination.newElement };
        }
    
        return { addPoints: B, newElement: null };
    }

    // Move carta da mão para o tabuleiro
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

    const onDragEnd = ({ source, destination }) => {
        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        if (source.droppableId === 'hand' && destination.droppableId === 'board') {
            const result = move(playerHand, boardCards, source, destination);
            setPlayerHand(result.hand);
            
            const tempBoard = result.board;
            const lenBoard = tempBoard.length;

            const { addPoints, newElement } = calculatePoints(tempBoard[lenBoard-2], tempBoard[lenBoard-1]);
            
            dispatch(addCard(tempBoard[lenBoard-1]));

            // console.log(addPoints);
            if (newElement !== null) {
                // console.log(newElement);
                setCombine({ id: uuid(), value: addPoints, suit: newElement });
            }

            setPoints(points + addPoints);
        }
    };

    // Timer para o próximo round
    useEffect(() => {
        let timer;
        if (isRoundOver && counter > 0) {
            timer = setTimeout(() => {
                setCounter(prev => prev - 1);
            }, 1000);
        }

        if (counter === 0) {
            // Limpa o tabuleiro
            dispatch(clear());
    
            // Incrementa a rodada -> Deck
            setRound(round + 1);

            setCounter(5);

            setIsRoundOver(false);
        }

        return () => clearTimeout(timer);
    }, [counter, isRoundOver]);

    // Jogador usou uma carta
    useEffect(() => {
        if (!isGameStarted) {
            setIsGameStarted(true);
            return;
        }

        if (playerHand.length === 0 && !isRoundOver && isGameStarted) {
            setIsRoundOver(true);
        }
    }, [playerHand]);

    return (
        <>
            <Menu />
            <Table>
                <Status round={round} points={points}/>
                <div style={{ display: 'grid', width: '100%', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr', placeItems: 'center' }}>
                    <div>Histórico</div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Board cards={boardCards} combine={combine}/>
                        <PlayerHand cards={playerHand} />
                    </DragDropContext>
                    <Deck newRound={round} startRound={startRound}/>
                </div>
                {isRoundOver && (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <h3 style={{ fontSize: '3rem' }}>FIM DO ROUND</h3>
                        <span style={{ fontSize: '1.7rem' }}>
                            PRÓXIMO ROUND EM {counter} SEGUNDOS...
                        </span>
                    </div>
                )}
            </Table>
        </>
    );
}