import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
    themeMode: string
}

const initialState: InitialState = {
    themeMode: "light"
}


const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state, action: PayloadAction<string>) => {
            state.themeMode = action.payload
        }
    }
})

export const {toggleTheme} = themeSlice.actions;
export default themeSlice.reducer;