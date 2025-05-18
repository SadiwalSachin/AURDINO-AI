import Editor, {DiffEditor , useMonaco ,loader} from "@monaco-editor/react"
import { useSelector } from "react-redux";
import TopBarForFiles from "./TopBarForFiles";
import { updateFileContent } from "../../redux/slices/file.slice";
import { useDispatch } from "react-redux";

const CodeEditor = () => {
  const file = useSelector(state=>state.fileSlice.allFiles)
  const activeFile = useSelector(state=>state.allFileSlice.activeFile)
  let content ;
  if(activeFile){
    content = file[activeFile]?.content
  }

  const dispatch = useDispatch()
  const handleChange = (value) => {
    dispatch(updateFileContent({"fileName":activeFile,"content":value}));
  };

  return (
    <div className="w-90vw border-l-2 border-slate-200  bg-[#1e1e1e]">
      <TopBarForFiles/>
      <Editor
        height="93vh"
        width="100%"
        defaultValue={content || ""}
        language={file.language}
        value={content || ""}
        onChange={handleChange}
        options={{
          fontSize: 19,
          minimap: { enabled: false },
          wordWrap: "on",
          renderLineHighlight: 'line', // This should enable highlight
        }}
        theme="vs-dark"
      />
    </div>
  )
}

export default CodeEditor