import { configureStore } from '@reduxjs/toolkit'
import stepSlice from './slices/step.slice'

export const store = configureStore({
    reducer: {
        ste: stepSlice,
    },
})