import express from 'express';
import portsRouter from './routes/ports.routes.js';
import apiErrorHandler from './utils/apiError.js';

const app = express();

const PORT = 3000;

app.use((req, res, next)=>{
    console.log(`[${new Date().toISOString()} ${req.method} ${req.url}]`)
    next();
});

app.use(express.json());
app.use("/ports",portsRouter);




app.get("/",(req,res)=>{
    res.status(200).json({
        message: "Welcome to Ports API"
    })
})

app.use(apiErrorHandler);

app.listen(PORT,()=>{
    console.log(`Server Running on http://localhost:${PORT}`);
})


