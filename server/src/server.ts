import express from 'express'; 

const app = express(); 

app.use(express.json()); 

app.get('/', (req, res) => res.send('Task Tracker server is running'));

app.listen(3000, () => console.log('Server on port 3000'));