import { mongoose } from "mongoose";

const patientHistorialSchema = new mongoose.Schema({
    "patientEmail": String,
    "patientName": String,
    "appointments": [
        {
            "appointmentId": String,
            "date": String,
            "doctorName": String,
            "doctorEmail": String,
            "specialty": String,
            "treatmentCode": String,
            "treatmentDescription": String,
            "treatmentCost": Number,
            "insuranceProvider": String,
            "coveragePercentage": Number,
            "amountPaid": Number
        }
    ]
})

export const PatientHistory = mongoose.model(
    "PatientHistory",
    patientHistorialSchema
);