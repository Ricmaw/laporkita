import express from "express";
import { createUser } from "../controllers/complaintController.mjs";

const router = express.Router();

router.post("/", createUser);

export default router;
