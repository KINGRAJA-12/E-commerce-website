import express from "express"
import {getCopan,verifyCopan} from "./../controllers/copan.controller.js"
import {protect} from "./../middlewars/proteced.middlewars.js"
let copanRoutes=express.Router()
copanRoutes.get("/get-copan",protect,getCopan);
copanRoutes.post("/validate-copan",protect,verifyCopan);
export default copanRoutes;