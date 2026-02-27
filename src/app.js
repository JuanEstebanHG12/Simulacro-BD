import express from 'express'
import { insertData } from './config/postgres.js'
import doctorsRoutes from './routes/doctors.js'
import reportsRoutes from './routes/reports.js'
import patientsRoutes from './routes/patients.js'

import { getDoctorById, getDoctors, updateDoctor } from './services/doctorsServices.js';

const app = express()

app.use(express.json())


app.use('/api/doctors', doctorsRoutes) //http://localhost:3000/api/doctor/:id
app.use('/api/reports', reportsRoutes)
app.use('/api/patients', patientsRoutes)

//Migrate Endpoint
app.post('/api/simulacro/migrate', async (req, res) => {
    try {
        console.log("Starting migration...");

        const r = await insertData();


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