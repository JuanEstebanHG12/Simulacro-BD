import { pool } from "../config/postgres.js";


async function reports() {
    const client = await pool.connect()
    try {
        const res = await client.query('select i.name, SUM(amount_paid) as total_revenue, count(a.id) as appointment_count,i.coverage_percentage ,ROUND(SUM(a.amount_paid) * ((100 - i.coverage_percentage)/100),2)as total_amount from "Appointment" a join "Insurance" i on a.insurance_id  = i.id group by i.id, i."name" ;')
        return res.rows
    } catch (error) {
        console.error(er);
    }finally{
        client.release()
    }
    
}

export {
    reports
}