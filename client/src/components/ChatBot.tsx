import { MessageCircleMore } from "lucide-react";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateFileContent } from "../../redux/slices/file.slice";

const ChatBot = () => {
  const [isChatBoxOpen, setIsChatBoxOpen] = useState<boolean>(false);


  const files = useSelector((state)=>state.fileSlice.allFiles)

  const [inputValue, setInputValue] = useState<string>("");
  const [showingSuggestions, setShowingSuggestions] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);


  function handleInputChange(e) {
    const value = e.target.value;
    setInputValue(value);

    if (value == "/") {
      setShowingSuggestions(true);
    } else if (showingSuggestions && !value.startsWith("/")) {
      setShowingSuggestions(false);
    }
  }

  function handleSelectFile(fileName){
    setSelectedFile(fileName)
    setInputValue(fileName)
    setShowingSuggestions(false)
  }

  const dispatch = useDispatch()
  const file = useSelector(state=>state.fileSlice.allFiles)
  const activeFile = useSelector(state=>state.allFileSlice.activeFile)

  async function refactorCode(e) {
    e.preventDefault();
    setIsChatBoxOpen(false);
    setShowingSuggestions(false)
    try {
      if(activeFile){
        const {content} = file[activeFile]
        console.log(`Active file ${file[activeFile]}`);
        console.log(`Active fileName ${activeFile}`);
        
        const requirementOfUser = inputValue

        const data = {
          "fileName":activeFile,
          "fileContent":content,
          requirementOfUser
        }

        const response = await axios.post("http://localhost:3000/api/v1/ai/command",data)

        console.log("response " , response);

        const code = response?.data?.code
        
        dispatch(updateFileContent({"fileName":activeFile,"content":code}));

      }
    } catch (error) {
      
    }
  }

  return (
    <>
      {!isChatBoxOpen && (
        <div className="h-13 w-13 border bg-zinc-600 rounded-full absolute bottom-10 left-10 flex items-center justify-center cursor-pointer">
          <MessageCircleMore
            onClick={() => setIsChatBoxOpen(true)}
            color="white"
            size={"35px"}
          />
        </div>
      )}

      {isChatBoxOpen && (
        <form
          className="p-1 absolute bottom-10 left-10 border-2 border-slate-[500] rounded-md flex w-[75vw]"
          action=""
          onSubmit={refactorCode}
        >
          <input
            placeholder="filename"
            onChange={handleInputChange}
            value={inputValue}
            className=" p-2 w-[96%] mr-2 rounded bg-[#2c2c2c] text-white outline-none"
          />
          <button className="w-15 h-10 bg-green-600 hover:bg-green-700 text-white font-semibold p-1 rounded">
            Send
          </button>
        </form>
      )}

      {showingSuggestions && (
        <div ref={dropdownRef} className="z-10 p-1 absolute bottom-10 bg-zinc-300 opacity-40 right-10 border-2 border-slate-[500] rounded-xl flex w-[50vw] -translate-x-1/2">
          <div className="h-30 overflow-auto w-full">
            {Object.keys(files).map((fileName, index) => (
              <div
                onClick={()=>handleSelectFile(fileName)}
                key={fileName}
                className={` bg-zinc-900 px-2 py-1 rounded mt-1 text-white cursor-pointer`}
              >
                <h2 className="">{fileName}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
