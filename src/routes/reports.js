import { Router } from "express";
import { reports } from "../services/reportsService.js";

const router = Router()

router.get('/revenue', async (req, res) => {
    res.status(200).json(reports())
})

export default router;