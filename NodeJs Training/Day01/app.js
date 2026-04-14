import express from "express";
import users from "./practice.js";

const app = express();

const PORT = 3000;

app.use(express.json());
app.use('/users', users);

// app.get('/',(req, res)=>{
//     res.status(200).json({
//         message:"Hii!! this is home route"
//     });

// });

// app.get('/login',(req, res)=>{
//     res.send("THIS IS LOGIN ROUTE");
// })

app.listen(PORT,()=>{
    console.log("server running on port 3000");
})