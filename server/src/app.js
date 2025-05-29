import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import codeRouter from "./routes/code.route.js"
import { systemInfo } from "./controllers/system.controller.js"


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"*",
    credentials:true
}
))

app.use("/api/v1/ai",codeRouter)

app.get("/api/v1/get-system-details",systemInfo)

app.listen(3000,()=>{
    console.log("App is listening on the port 3000");  
})

export {app}