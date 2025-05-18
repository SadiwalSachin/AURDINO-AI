import { useSelector } from "react-redux";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeFileFromTopBar, setActiveFile } from "../../redux/slices/allFile.slice";

const TopBarForFiles = () => {

  const dispatch = useDispatch()

  const allFilesOnTopBar = useSelector(
    (state) => state.allFileSlice.allFilesOnTopBar
  );

  const activeFile = useSelector((state)=>state.allFileSlice.activeFile)

  const handleRemoveFileFromTopBar =( fileName:string) => {
    dispatch(removeFileFromTopBar(fileName))
    dispatch(setActiveFile(""))
  }

  return (
    <div className="w-[100%] bg-zinc-700 h-10 text-white flex items-center">
      {allFilesOnTopBar.map((fileName:string, index:number) => (
        <div
        key={index} className={`w-max p-3 border-r text-center h-[100%] flex items-center hover:bg-zinc-500 ${fileName==activeFile ? "bg-zinc-900" : ""} cursor-pointer `}>
          <h2
          onClick={()=>dispatch(setActiveFile(fileName))}
          >
          {fileName}
          </h2>
          <h2 onClick={()=>handleRemoveFileFromTopBar(fileName)} className="ml-2"><X size={"20"}/></h2>
        </div>
      ))}
    </div>
  );
};

export default TopBarForFiles;
