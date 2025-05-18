import {configureStore} from "@reduxjs/toolkit"
import fileSlice from "./slices/file.slice"
import allFileSlice from "./slices/allFile.slice"

export const store = configureStore({
    reducer:{
        fileSlice,
        allFileSlice
    }
})
