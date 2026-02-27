import { PatientHistory } from "../models/patien_historial.js";


async function getPatientHistory({ email }) {
    try {

        const res = await PatientHistory.findOne(
            { patientEmail: email },
        )      

        const specialtyCount = {}
        res.appointments.map(i => {
            specialtyCount[i.specialty] = (specialtyCount[i.specialty] || 0) +1
            
        })
        let mostFrequentSpecialty = ''
        let cont = 0
        for (const element of Object.entries(specialtyCount)) {
            if (element[1] > cont) {
                cont = element[1]
                mostFrequentSpecialty = element[0]
            }
        }
        

        return {
            "ok": true,
            "patient": {
                "email": res.patientEmail,
                "name": res.patientName
            },
            "appointments": [
                res.appointments
            ],
            "summary": {
                "totalAppointments": res.appointments.length,
                "totalSpent": res.appointments.reduce((a,b) => a + Number(b.amountPaid),0),
                "mostFrequentSpecialty": mostFrequentSpecialty
            }
        }


    } catch (error) {
        console.error(error);
    }
}

export {
    getPatientHistory
}