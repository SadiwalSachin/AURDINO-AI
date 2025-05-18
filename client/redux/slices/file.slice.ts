import { createSlice } from "@reduxjs/toolkit";

type FileData = {
    fileName:string,
    content:string,
    language:string | undefined,
    parentFolder:string
}

type FileState = {
    allFiles:Record<string , FileData>
}

const initialState : FileState = {
    allFiles:{}
}

const fileSlice = createSlice({
    name:"project",
    initialState:initialState,
    reducers:{
        createFile(state,action){
            const {fileName , content , language , parentFolder} = action.payload
            state.allFiles[fileName]={
                fileName,
                content,
                "language":language || "",
                "parentFolder": parentFolder || ""
            }
        },
        updateFileContent(state,action){
            const {fileName,content} =action?.payload
            const file = state.allFiles[fileName]
            if (file){
                file.content = content
            }
        }
    }
})

export const {createFile,updateFileContent} = fileSlice.actions
export default fileSlice.reducer