import CodeEditor from "./components/CodeEditor"
import Sidebar from "./components/Sidebar";
import { useSelector } from "react-redux";

function App() {

  const activeFile = useSelector((state)=>state.allFileSlice.activeFile)

  return (
    <>
     <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        {activeFile ? (
          <CodeEditor
          />
        ) : (
          <div className="bg-zinc-800 h-screen flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-slate-300">Welcome to AURDINO-AI</h1>
            <h2 className="text-slate-300 text-3xl mt-6">
            📂 Open or add a file to start coding
            </h2>
            </div>
        )}
      </div>
    </div>
    </>
  )
}

export default App
