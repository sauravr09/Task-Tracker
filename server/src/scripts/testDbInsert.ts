import { db } from "../db/connection.js";

const user = db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)');
const result = user.run('test@gmail.com', 'testpassword');

console.log(result.lastInsertRowid);