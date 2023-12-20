import { configureStore } from '@reduxjs/toolkit'
import handReducer from '../features/hand/handSlice'
import slotsReducer from '../features/slots/slotsSlice'

export default configureStore({
    reducer: {
        hand: handReducer,
        slots: slotsReducer,
    },
})
