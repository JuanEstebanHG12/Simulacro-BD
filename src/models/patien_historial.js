import { mongoose } from "mongoose";

const appointmentSchema = new mongoose.Schema({
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
})

const patientHistorialSchema = new mongoose.Schema({
    "patientEmail": String,
    "patientName": String,
    "appointments": [
        appointmentSchema
    ]
},{ _id: false } // quitar el id automatico de mongoDB
)

export const PatientHistory = mongoose.model(
    "PatientHistory",
    patientHistorialSchema
);