import express from 'express';
const router = express.Router();

let data = [];




router.post('/',(req,res)=>{

    const{name, age} = req.body;

    console.log(`Hii ${name} your age is ${age}`);
    data.push({ name, age });

    res.status(201).json({ success: true, user: { name, age } });
});

router.get('/',(req,res)=>{

    res.send("this shows users");

})

export default router;