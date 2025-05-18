import React, { useState } from "react";
import { createFile } from "../../redux/slices/file.slice";
import { useDispatch } from "react-redux";
import {
  setActiveFile,
  setAllFilesOnTopBar,
} from "../../redux/slices/allFile.slice";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [fileName, setFileName] = useState("");
  const dispatch = useDispatch();


  const files = useSelector((state)=>state.fileSlice.allFiles)

  const handleAdd = (e) => {
    e.preventDefault()
    const languageType = fileName.split(".");
    const language = languageType.length > 1 ? languageType.pop() : "";
    dispatch(
      createFile({
        fileName,
        language: language,
        content: "",
        parentFolder: "",
      })
    );
    dispatch(setAllFilesOnTopBar(fileName));
    dispatch(setActiveFile(fileName));
  };

  function handleActiveFileAndTopBar(fileName: string) {
    console.log((fileName));
    
    dispatch(setAllFilesOnTopBar(fileName));
    dispatch(setActiveFile(fileName));
  }

  return (
    <div className="w-[300px] bg-[#1e1e1e] text-white p-4">
        <form className="p-1 border-2 border-slate-[500] rounded-md flex w-[95%]" action="" onSubmit={handleAdd}>
        <input
          placeholder="filename"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className=" p-2 w-[70%] mr-2 rounded bg-[#2c2c2c] text-white outline-none"
        />
        <button
          className="w-15 h-10 bg-green-600 hover:bg-green-700 text-white font-semibold p-1 rounded"
        >
          Add
        </button>
        </form>
      <h3 className="text-lg font-semibold mt-4">📁 Files</h3>

      <ul className="mt-5 space-y-2">
        {
          Object.keys(files).map((fileName,index)=>(
            <li
            key={index}
            onClick={() => handleActiveFileAndTopBar(fileName)}
            className="cursor-pointer p-2 rounded bg-[#2c2c2c] hover:bg-[#3a3a3a] transition"
          >
            {fileName}
          </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Sidebar;
