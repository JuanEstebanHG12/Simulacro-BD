import { pool } from "../config/postgres.js";


async function reports() {
    const client = await pool.connect()
    try {
        await client.query('')
        return console.log("reports");
    } catch (error) {
        console.error(er);
    }finally{
        client.release()
    }
    
}

export {
    reports
}