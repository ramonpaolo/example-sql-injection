import express from 'express'
import pg from 'pg'

const app = express()

app.use(express.json())

const database = new pg.Client({password: 'postgresql', user: 'postgresql', host: 'localhost'});

(async () => {
    await database.connect()
    await database.query('CREATE TABLE IF NOT EXISTS users (name varchar(50));')
})()

type Country = 'Brazil' | 'United States';

interface IUser{
    name: string;
    age?: string;
    country: Country;
}

app.get('/users', async (req, res) => {
    const limit = parseInt(req.body.limit) || 10;

    const resultQuery = await database.query(`SELECT * FROM "users" LIMIT ${limit}`)
    const rows: IUser[] = resultQuery.rows
    
    for(const user of rows){
        console.log(user.name)
    }
    
    res.json(rows)
})

app.listen(3000)