// users/members
export const createUser = 'INSERT INTO users (name, email, password, gender, role) values ($1, $2, $3, $4, $5) returning *';
export const findEmail = 'SELECT * FROM users WHERE email = $1';
export const findIfUserExist = 'SELECT * FROM users WHERE email = $1';
export const findUser = 'SELECT * FROM users WHERE id = $1';
export const findAllUser = `SELECT id, name, gender, email FROM users`;

// Clubs
export const createClub = 'INSERT INTO clubs (club_owner_id, clubname, description) values ($1, $2, $3) returning *';
export const findAClub = 'SELECT * FROM clubs WHERE club_id = $1';
export const deleteOwnClub = 'DELETE FROM clubs WHERE club_id = $1 returning *';