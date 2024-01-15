import { Router } from "express";
import {messages} from "../controllers/views_controllers.js";

const router = Router();

router.get('/', messages );

export default router;