import dotenv from 'dotenv';
import pool from '../db.connection';
import Helper from '../../utilities/utils';

dotenv.config();

const password = process.env.PASSWORD;
const hashedPassword = Helper.hashPassword(password);

const addAllsqlTableQueries = `
      INSERT INTO users(name, email, password, gender, role) 
      VALUES ('alimi', 'alimi@clubma.com', '${hashedPassword}', 'male', 'admin'),
             ('moyosore', 'moyo@clubma.com', '${hashedPassword}', 'female', 'member');
      INSERT INTO clubs(club_owner_id, clubname, description) 
      VALUES ( 2, 'Young boys', 'ambitious fellow club'),
             ( 1, 'Pathfinder', 'a place of joy for everyone');
      `;

/**
 * Function representing UserTableHandler
 * @returns {object} representing sucess or failure
 */
async function insertAllToTables() {
  try {
    const create = await pool.query(addAllsqlTableQueries);
    console.log(`addAllsqlTableQueries: ${create[0].command}ED`);
  } catch (error) {
    console.log(`addAllsqlTableQueries: ${error}`);
  }
}

export default insertAllToTables;