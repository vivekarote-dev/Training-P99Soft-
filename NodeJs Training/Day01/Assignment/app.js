import express from 'express';
import notes from './notes.js';

const app = express();

app.use(express.json());

app.use('/api/v1/notes',notes);

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

