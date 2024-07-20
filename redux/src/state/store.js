import { configureStore } from '@reduxjs/toolkit'
import tableDataReducer from './table/tableDataSlice'

export const store = configureStore({
    reducer: {
        table : tableDataReducer,
    },
})