import express from 'express'; 
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { initDb } from './db/schema.js';
import authRoutes from './routes/authRoutes.js'
import { errorHandler } from './middlewares/errorHandler.js';


// initilize the DB 
initDb();

const app = express(); 
const PORT = process.env.PORT || 5000;

// Middlewares 
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json()); 
app.use(cookieParser()); // read cookie from http request and turn into JS object from req.cookies which can be used.

app.get('/', (req, res) => res.send('Task Tracker server is running'));


// Routes
app.use('/auth', authRoutes);

// Error handling 
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server on port ${3000}`));