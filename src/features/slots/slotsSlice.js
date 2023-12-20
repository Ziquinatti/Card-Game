import { createSlice } from "@reduxjs/toolkit";

export const slotsSlice = createSlice({
    name: 'slots',
    initialState: {
        slotsLength: 4,
        allPlayerSlots: [
            {
                uuid: '10',
                name: 'Guerreiro',
                life: 50,
                damage: 15
            },
        ],
        allOpponentSlots: [{
                uuid: '20',
                name: 'Guerreiro',
                life: 50,
                damage: 15
            },
            {
                uuid: '21',
                name: 'Guerreiro',
                life: 50,
                damage: 15
            },
            {
                uuid: '22',
                name: 'Guerreiro',
                life: 50,
                damage: 15
            }
        ],
    },
    reducers: {
        setCard: {
            reducer: (state, action) => {
                state.allPlayerSlots[action.payload.slotIndex] = action.payload.card
            },
            prepare: (slotIndex, cardInfo) => {
                return { payload: { slotIndex: slotIndex, card: {...cardInfo}} }
            }
        },
    },
})

export const { setCard } = slotsSlice.actions

export default slotsSlice.reducer