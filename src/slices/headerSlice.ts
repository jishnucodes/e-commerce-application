import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    isSidebarOpen: boolean
}

const initialState: InitialState = {
    isSidebarOpen: false
}


const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
       showSidebar: (state, action) => {
        console.log("payload resp", action.payload)
        state.isSidebarOpen = action.payload;
       }
    }
})

export const {showSidebar} = headerSlice.actions;
export default headerSlice.reducer;