import { configureStore } from '@reduxjs/toolkit'
import stepSlice from './slices/step.slice'
import optionSlice from './slices/option.slice'

export const store = configureStore({
    reducer: {
        ste: stepSlice,
        opt : optionSlice
    },
})