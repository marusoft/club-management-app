import pool from '../../db.connection';

const clubsTable = `
DROP TABLE IF EXISTS clubs CASCADE;
  CREATE TABLE IF NOT EXISTS clubs(
    club_id SERIAL PRIMARY KEY NOT NULL,
    club_owner_id INTEGER NOT NULL,
    clubname VARCHAR(128) NOT NULL,
    description TEXT NOT NULL,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_owner_id) REFERENCES users(id) ON DELETE CASCADE
  )`;

/**
 * Function representing ClubsTableHandler
 * @returns {object} representing sucess or failure
 */
async function createClubsTable() {
  try {
    const create = await pool.query(clubsTable);
    console.log(`clubsTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(`clubsTable: ${error}`);
  }
}

export default createClubsTable;