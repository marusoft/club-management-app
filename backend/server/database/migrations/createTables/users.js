import pool from "../../db.connection";

const usersTable = `
DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE IF NOT EXISTS users( 
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    gender VARCHAR(90) NOT NULL DEFAULT 'male',
    role VARCHAR(100) NOT NULL DEFAULT 'admin'
  )`;

/**
 * Function representing UserTableHandler
 * @returns {object} representing sucess or failure
 */
async function createUsersTable() {
  try {
    const create = await pool.query(usersTable);
    console.log(
      `usersTable: ${create[0].command}PED and ${create[1].command}D`
    );
  } catch (error) {
    console.log(`usersTable: ${error}`);
  }
}

export default createUsersTable;
