import Editor, {DiffEditor , useMonaco ,loader} from "@monaco-editor/react"
import { useSelector } from "react-redux";
import TopBarForFiles from "./TopBarForFiles";
import { updateFileContent } from "../../redux/slices/file.slice";
import { useDispatch } from "react-redux";
import ChatBot from "./ChatBot";
import Terminal from "./Terminal";
import { useState } from "react";
import { TerminalIcon } from "lucide-react";

const CodeEditor = () => {

  const [showTerminal,setShowTerminal] = useState<boolean>(false)

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
    <div className="w-90vw border-l-2 border-slate-200  bg-[#1e1e1e] relative">
      <div className="flex items-center bg-zinc-700 h-10">
      <TopBarForFiles/>
      <TerminalIcon onClick={()=>setShowTerminal(true)} color="white" className="mr-4 cursor-pointer"/>
      </div>

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

      <ChatBot/>

      <Terminal showTerminal={showTerminal} setShowTerminal={setShowTerminal}/>
    </div>
  )
}

export default CodeEditor