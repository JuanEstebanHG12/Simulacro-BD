import { Router } from 'express'
import { getDoctorById, getDoctors, updateDoctor } from '../services/doctorsServices.js';

const router = Router();

//Doctors endpoint
router.get('/', async (req, res) => {
    try {
        const doctors = await getDoctors();
        res.status(200).json({
            "ok": true,
            "doctors": doctors
        });
    } catch (error) {
        console.error("Doctors error:", error);
        res.status(500).json({
            success: false,
            message: "Doctors failed"
        });
    }
})

//Doctor endpoint by id
router.get('/:id', async (req, res) => {
    try {
        const doctor = await getDoctorById(req.params.id);
        if (!doctor) {
            return res.status(404).json({
                "ok": false,
                "error": "Doctor not found"
            })
        }

        res.status(200).json({
            "ok": true,
            "doctor": {
                "id": doctor.id,
                "name": doctor.name,
                "email": doctor.email,
                "specialty": doctor.specialty,
                "createdAt": doctor.createdAt
            }
        });
    } catch (error) {
        console.error("Doctor error:", error);
        res.status(500).json({
            success: false,
            message: "Doctor failed"
        });
    }
})

//Update doctor endpoint

//Falta la propagación de los cambios
router.put('/:id', async (req, res) => {
    try {
        const doctor = await updateDoctor(req.params.id, req.body);
        if (!doctor) {
            return res.status(404).json({
                "ok": false,
                "message" : "Doctor not found"
            })
        }
        res.status(200).json({
            "ok": true,
            "message": "Doctor updated successfully",
            "doctor": doctor
        });
    } catch (error) {
        console.error("Doctor error:", error);
        res.status(500).json({
            success: false,
            message: "Doctor failed"
        });
    }
})

export default router;