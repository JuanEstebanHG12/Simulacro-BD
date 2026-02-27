import { Router } from "express";
import { reports } from "../services/reportsService.js";

const router = Router()

router.get('/revenue', async (req, res) => {
    const r = await reports()
    let totalRevenue = 0
    r.forEach(i => totalRevenue += Number(i.total_revenue))
    let respo = []
    r.forEach(i => {
        respo.push(
            {
                "insuranceName" : i.name,
                "totalAmount": i.total_amount,
                "appointmentCount" : i.appointment_count
            }
        )
    })
    res.status(200).json({
        "ok": true,
        "report": {
            "totalRevenue": totalRevenue,
            "byInsurance": respo,
            "period": {
                "startDate": "2024-01-01",
                "endDate": "2024-12-31"
            }
        }
    })
})

export default router;