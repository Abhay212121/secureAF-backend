#! /usr/bin / env node

const { Client } = require('pg')

require('dotenv').config()


const SQL = `
    DROP TABLE users;

CREATE TABLE IF NOT EXISTS users(
    userId INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (255),
    email VARCHAR (255),
    password VARCHAR (255)
)
`

async function main() {
    console.log('seeding....')
    const client = new Client({
        connectionString: process.env.CONNECTION_STRING
    })
    await client.connect()
    await client.query(SQL)
    await client.end()
    console.log('Done!')
}

main()