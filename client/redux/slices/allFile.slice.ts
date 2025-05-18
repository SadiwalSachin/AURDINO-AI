import { createSlice } from "@reduxjs/toolkit";


type topBarSliceFileType = {
    allFilesOnTopBar:string[],
    activeFile: null | undefined | string
}

const initialState:topBarSliceFileType = {
    allFilesOnTopBar:[],
    activeFile:null,
}

const allFileSlice = createSlice({
    name:"allFile",
    initialState:initialState,
    reducers:{
        setAllFilesOnTopBar(state,action){
            if(!(state.allFilesOnTopBar.length>5)){
                const fileName = action.payload
                const isFileExist = state.allFilesOnTopBar.includes(fileName)
                if(!isFileExist){
                    state.allFilesOnTopBar.push(fileName)
                }
            }
        },
        setActiveFile(state,action){
            state.activeFile = action.payload
        },
        removeFileFromTopBar(state,action){
            state.allFilesOnTopBar = state.allFilesOnTopBar.filter((fileName)=>{
                return fileName!=action.payload
            })
        }

    }
})

export const {setActiveFile , setAllFilesOnTopBar , removeFileFromTopBar} = allFileSlice.actions
export default allFileSlice.reducer