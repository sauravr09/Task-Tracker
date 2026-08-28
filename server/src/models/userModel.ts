import { db } from "../db/connection.js";
import type { UserLoginRequestBody, UserRegisterRequestBody, UserRow } from "../types/user.js";

export const UserModel = {

    async getUserByUsernameOrEmail(username: string, email : string) : Promise<UserRow | undefined> { 
        const sql = `SELECT * FROM users WHERE username = ? OR email = ?`;
        const result = db.prepare(sql).get(username, email) as UserRow | undefined;

        return result;
    },

    async getUserById(id: number): Promise<UserRow | undefined> { 
        const sql = `SELECT * FROM users WHERE id = ?`;
        const result = db.prepare(sql).get(id) as UserRow | undefined;

        return result;
    },

    // needed if implementation for login by username in future
    async getUserByIdentifier(identifier: string) : Promise<UserRow | undefined>{
        const sql = `SELECT * FROM users WHERE username = ? OR email = ?`;
        const result = db.prepare(sql).get(identifier, identifier) as UserRow | undefined;

        return result;
    
    },

    async registerUser({username, email, password} : UserRegisterRequestBody): Promise<number> {
        const sql = `INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`;
        const exec = db.prepare(sql).run(username, email, password);

        return exec.lastInsertRowid as number;
    }





}