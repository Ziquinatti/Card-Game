import { createSlice } from "@reduxjs/toolkit";

export const slotsSlice = createSlice({
    name: 'slots',
    initialState: {
        slotsLength: 4,
        allSlots: [
            {
                id: 0,
                name: 'Guerreiro',
                life: 50,
                damage: 15
            }
        ]
    },
    reducers: {
        setCard: {
            reducer: (state, action) => {
                state.slots[action.payload.slotId] = action.payload.card
            },
            prepare: (slotId, cardInfo) => {
                return { payload: { slotId: slotId, card: {...cardInfo}} }
            }
        },
    },
})

export const { setCard } = slotsSlice.actions

export default slotsSlice.reducer