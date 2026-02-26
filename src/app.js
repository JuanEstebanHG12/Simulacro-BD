import express from 'express'
import { createTables, insertData } from './config/postgres.js'

const app = express()

app.get('/init-db', async (req, res) => {
    try {
        await createTables();
        await insertData();
        res.status(200).json({ response: true, message: "Tables created successfylly" })
    } catch (error) {
        console.log(error);
        res.status(500)
    }
})

export default app