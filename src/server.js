import { createTables } from './config/postgres.js'
import app from './app.js'
import { env } from './config/env.js'


try {
    app.get('/init-db', async (req, res)=>{
        try {
            await createTables();
            res.status(200).json({response : true , message : "Tables created successfylly"})
        } catch (error) {
            console.log(error);
            res.status(500)
        }
    })
    console.log('Conecting to PostgresSQL...');
    /*await createTables();
    console.log('Successfully'); */
    app.listen(env.port, () => {
        console.log(`server running on port ${env.port}`);
    })

} catch (error) {
    console.log(error);
    process.exit(1)
}