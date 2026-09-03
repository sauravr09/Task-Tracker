import express from 'express'; 
import { initDb } from './db/schema.js';
import authRoutes from './routes/authRoutes.js'
import { errorHandler } from './middlewares/errorHandler.js';


// initilize the DB 
initDb();

const app = express(); 
const PORT = process.env.PORT || 5000;

// Middlewares 
app.use(express.json()); 

app.get('/', (req, res) => res.send('Task Tracker server is running'));


// Routes
app.use('/auth', authRoutes);

// Error handling 
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server on port ${3000}`));