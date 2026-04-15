import express from 'express'
import employeeRoutes from './routes/employee.routes.js'
const app = express();
const PORT =3000;

app.use(express.json());

app.use((req, res, next)=>{
    console.log(`[${new Date().toISOString()} ${req.method} ${req.url}]`)
    next();
});

app.use('/employees',employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});