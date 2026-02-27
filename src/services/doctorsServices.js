import { pool } from "../config/postgres.js";

async function getDoctors() {
    const client = await pool.connect()
    try {
        const res = await client.query('SELECT * FROM "Doctor"')
        return res.rows
    } catch (error) {
        console.log(error);
    } finally {
        client.release()
    }
}

async function getDoctorById(id) {
    const client = await pool.connect()
    try {
        const res = await client.query('SELECT d.id, d.name, d.email, s.name as specialty FROM "Doctor" d INNER JOIN "Specialty" s ON d.specialty_id = s.id WHERE d.id = $1', [id])
        return res.rows[0]
    } catch (error) {
        console.log(error);
    } finally {
        client.release()
    }
}

async function updateDoctor(id, data) {
    const client = await pool.connect()
    try {
        const specialty_id = await client.query('SELECT id FROM "Specialty" WHERE name ILIKE $1', [data.specialty])
        
        const res = await client.query('UPDATE "Doctor" SET name = $1, email = $2, specialty_id = $3 WHERE id = $4 RETURNING *', [data.name, data.email, specialty_id.rows[0].id, id])
        return res.rows[0]
    } catch (error) {
        console.log(error);
    } finally {
        client.release()
    }
}

export { getDoctors, getDoctorById, updateDoctor }