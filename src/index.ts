import express from 'express'
import pg from 'pg'

import { faker } from '@faker-js/faker'

const app = express()

app.use(express.json())

const database = new pg.Client({ password: 'postgresql', user: 'postgresql', host: 'localhost' });

(async () => {
    await database.connect()
    await database.query('CREATE TABLE IF NOT EXISTS users (name varchar(50));')
    for (let i = 0; i <= 10; i++) {
        const name = faker.name.firstName()
        await database.query(`INSERT INTO "users" VALUES ('${name}')`)
    }
})()

interface IUser {
    name: string;
}

app.route('/users').get(async (req, res) => {
    const limit = parseInt(String(req.query.limit)) || 100;

    const resultQuery = await database.query(`SELECT * FROM "users" LIMIT ${limit}`)
    const rows: IUser[] = resultQuery.rows

    res.json(rows)
}).post(async (req, res) => {
    const user = req.body as IUser

    const resultQuery = await database.query(`INSERT INTO "users" VALUES ('${user.name}')`)

    res.status(201).json(resultQuery)
}).delete(async (req, res) => {
    const user = req.body as IUser

    const resultQuery = await database.query(`DELETE FROM "users" WHERE name = '${user.name}'`)

    res.status(200).json(resultQuery)
})

app.listen(3000)