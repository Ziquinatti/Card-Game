import { createSlice } from "@reduxjs/toolkit";

export const handSlice = createSlice({
    name: 'hand',
    initialState: {
        cards: [
            {
                id: 0,
                name: 'Guerreiro',
                life: 50,
                damage: 15
            },
            {
                id: 2,
                name: 'Leão',
                life: 20,
                damage: 32
            },
        ],
    },
    reducers: {
        drawCard: {
            reducer: (state, action) => {
                state.cards.push(action.payload)
            },
            prepare: (cardInfo) => {
                return { payload: {...cardInfo} }
            }
        },
        removeCard: {
            reducer: (state, action) => {
                state.cards.splice(action.payload, 1)
            },
            prepare: (index) => {
                return { payload: {...index} }
            },
        },
    },
})

export const { drawCard, removeCard } = handSlice.actions

export default handSlice.reducer