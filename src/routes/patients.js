import { Router } from "express";
import { getPatientHistory } from "../services/patientsServices.js";


const router = Router()

router.get('/:email/history', async (req, res) => {
    const r = await getPatientHistory(req.params)
    if (!r) {
        return res.status(404).json({
            "ok": false,
            "error": "Patient not found"
        })
    }
    res.status(200).json(r)
})

export default router