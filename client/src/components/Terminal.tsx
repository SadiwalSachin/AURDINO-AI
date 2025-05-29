import axios from "axios";
import { useEffect, useState } from "react";

const Terminal = ({ showTerminal, setShowTerminal }) => {
  const [currentInfo, setCurrentInfo] = useState("");

  useEffect(() => {
    async function getSystemInfo() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-system-details"
        );

        console.log(response.data);
        setCurrentInfo(response.data.cwd);
      } catch (error) {}
    }

    getSystemInfo();
  });

  return (
    <>
      {showTerminal && (
        <div className="w-full border-t border-gray-600 bg-black text-green-400 font-mono absolute bottom-0">
          <div className="bg-zinc-700 h-6 cursor-pointer flex text-white justify-end items-center">
            <h2 onClick={() => setShowTerminal(false)} className="mr-5">
              X
            </h2>
          </div>
            <p>{currentInfo}</p>
          <div className="overflow-auto h-full p-2" tabIndex={0} contentEditable="true">
            <p>Initializing AI Compiler...</p>
            <p>Connecting to Arduino...</p>
            <p>Upload complete ✅</p>
            {/* Add terminal output dynamically */}
          </div>
        </div>
      )}
    </>
  );
};

export default Terminal;
