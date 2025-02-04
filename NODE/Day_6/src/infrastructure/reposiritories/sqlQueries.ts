// src/infrastructure/repositories/sqlQueries.ts

/**
 * Query to get a user by their username.
 */
export const getUserByUsernameQuery = 'SELECT id, username, role, password FROM users WHERE username = ?';

/**
 * Query to create a new user in the database.
 */
export const createUserQuery = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';


export const deleteUserQuery = 'delete from users where id = ?';

/**
 * Query to check if a user exists by ID.
 */
export const getUserByIdQuery = 'SELECT id,username,password,role FROM users WHERE id = ?';

/**
 * Query to fetch all users.
 */
export const getAllUsersQuery = 'SELECT * FROM users';

/**
 * Query to update a user's role.
 */
export const updateUserRoleQuery = 'UPDATE users SET ? WHERE id = ?';
