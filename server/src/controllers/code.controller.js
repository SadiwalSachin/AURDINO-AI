import OpenAI from "openai";
import {
  refactorCodeSystemPrompt,
  routeUserRequirement,
} from "../utilities/system.prompt.js";
import dotenv from "dotenv";
dotenv.config();

import {exec} from "child_process"
import {promisify} from "util" 

const execPromise = promisify(exec);

const client = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

function cleanCodeBlock(codeString) {
  let cleaned = codeString.replace(/^```[a-z]*\n?/i, "");

  // Remove ending ```
  cleaned = cleaned.replace(/```$/, "");

  return cleaned.trim();
}

const refactorCode = async (req, res) => {
  try {
    const { fileName, fileContent, requirementOfUser } = req.body;
    console.log(fileContent, fileName, requirementOfUser);

    const REFACTOR_SYSTEM_PROMPT = refactorCodeSystemPrompt(fileContent);

    const response = await client.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "system",
          content: REFACTOR_SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: requirementOfUser,
        },
      ],
    });

    const rawJson = response.choices[0].message.content;

    const result = cleanCodeBlock(rawJson);

    console.log(result);

    return res.status(200).json({
      success: true,
      message: "refactored code",
      code: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const installDependencies = async (command) => {
    try {
        console.log(`\n🔧 Installing with: ${command}\n`);
    
        const { stdout, stderr } = await execPromise(command);
    
        if (stdout) {
          console.log(`✅ Output:\n${stdout}`);
        }
        if (stderr) {
          console.warn(`⚠️ Stderr:\n${stderr}`);
        }
    
        console.log('🎉 Installation complete.');
      } catch (error) {
        console.error(`❌ Installation failed:\n${error.message}`);
      }
}

const aiCommand = async (req, res) => {
  try {
    const { fileName, fileContent, requirementOfUser } = req.body;
    console.log(fileContent, fileName, requirementOfUser);

     const SYSTEM_PROMPT = `You are an help full ai assistant who basically decide what to do next based on user requirement . You have to analyze the user query that what actually user want's based on requirement decide what we have to do . 
      User query can only be related to two things - 
        1 : To write some code for its requirement
        2 : Install some dependencies or library for users requirement

      Tools we have to full fill the users requierment
        for writing code :- writeCode
          writeCode tool take only prompt that what actually have to write
        for installing dependencies - installDependencies  
          installDependencies tool take the command to execute 
      
      Steps to solve user query
          step - 1 think what user wants
          step - 2 analyze the user query
          step - 3 decide tool
          setp - 4 if tool is installDependencies generate command for that dependencies to install that dependecies and if tool is writeCode generate prompt
          

      Examples:
        Input:"Hii write the code for 4 motor driver for aurdino"
        Output:{
          "think":"User want to write code",
          "analyze":"User wanted to write code specifically for 4 motor driver for aurdino",
          "tool":"writeCode",
          "prompt":"User wanted to write code specifically for 4 motor driver for aurdino",
        }

        Input:"Hii install 4vo library for 4 motor driver for aurdino"
         Output:{
          "think":"User want to install library",
          "analyze":"User wanted to install library for 4vo ",
          "tool":"installDependencies",
          "prompt":"command",
        }
  `

    const response = await client.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: requirementOfUser,
        },
      ],
    });

    const rawJson = response.choices[0].message.content;

    const result = JSON.parse(cleanCodeBlock(rawJson))
    
    console.log(result);
    

    if(result.tool == "installDependencies"){
        const command = result["prompt"]
        const response = await installDependencies(command)
    } else if(result["tool"] == "writeCode"){
        console.log("write code tool chala");
    }

    // console.log(result);
  } catch (error) {
    console.log(error);
    
  }
};

export { refactorCode, aiCommand };
