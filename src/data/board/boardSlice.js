import { createSlice } from "@reduxjs/toolkit";

export const boardSlice = createSlice({
    name: 'board',
    initialState: {
        cards: []
    },
    reducers: {
        addCard: {
            reducer: (state, action) => {
                state.cards.push(action.payload);
            },
            prepare: (card) => {
                return { payload: {...card} }
            }
        },
        clear: {
            reducer: (state, action)  => {
                state.cards = [];
            }
        }
    },
})

export const { addCard, clear } = boardSlice.actions

export default boardSlice.reducer