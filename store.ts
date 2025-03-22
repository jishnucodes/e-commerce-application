import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './src/slices/themeSlice'
import headerReducer from './src/slices/headerSlice'

const store = configureStore({
    reducer: {
        theme: themeReducer, // Add your slice reducer here
        header: headerReducer,
    },
});

// Export RootState and AppDispatch for better TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;