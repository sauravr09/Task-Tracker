import Database from "better-sqlite3";
import path from "path"
import fs from 'fs';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../../data');
const DB_PATH = path.join(DATA_DIR, 'taskTracker.db');


if (!fs.existsSync(DATA_DIR)) { 
    fs.mkdirSync(DATA_DIR, {recursive: true})
}


export const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL'); // allow read and write to happen at same time without blocking each other (multiple writes will take turns)
db.pragma('foreign_keys = ON');