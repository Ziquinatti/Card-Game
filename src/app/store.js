import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../data/board/boardSlice";

export default configureStore({
    reducer: {
        board: boardReducer,
    }
})