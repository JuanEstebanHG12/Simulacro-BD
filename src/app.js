import express from 'express'
import { insertData } from './config/postgres.js'

const app = express()

app.post('/api/simulacro/migrate', async (req, res) => {
    try {
        console.log("Starting migration...");

        const r = await insertData();
        console.log(r);
        

        res.status(200).json({
            success: true,
            message: {
                "ok": true,
                "message": "Migration completed successfully",
                "result": {
                    "patients": r.patients,
                    "doctors": r.doctors,
                    "insurances": r.insurances,
                    "appointments": r.appointments,
                    "histories": r.histories,
                    "csvPath": "./simulacro_saludplus_data.csv"
                }
            }
        });

    } catch (error) {
        console.error("Migration error:", error);
        res.status(500).json({
            success: false,
            message: "Migration failed"
        });
    }
})

export default app