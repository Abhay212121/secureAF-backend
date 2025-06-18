#! /usr/bin / env node

const { Client } = require('pg')

require('dotenv').config()


const createUsersSQL = `
    DROP TABLE users;
CREATE TABLE IF NOT EXISTS users(
    userId INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (255),
    email VARCHAR (255),
    password VARCHAR (255),
    role VARCHAR(100) DEFAULT 'not a member'
);`

const createPostsSQL =
    `
    DROP TABLE posts;
    CREATE TABLE IF NOT EXISTS posts(
    postId INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (255),
    post_title VARCHAR (255),
    post_message TEXT,
    post_time VARCHAR (255)
)

`

async function main() {
    console.log('seeding....')
    const client = new Client({
        connectionString: process.env.CONNECTION_STRING
    })
    await client.connect()
    await client.query(createPostsSQL)
    await client.end()
    console.log('Done!')
}

main()