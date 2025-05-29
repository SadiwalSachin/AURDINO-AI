import { Router } from "express";
import { aiCommand, refactorCode } from "../controllers/code.controller.js";

const codeRouter = Router()

codeRouter.route("/command").post(aiCommand)


export default codeRouter