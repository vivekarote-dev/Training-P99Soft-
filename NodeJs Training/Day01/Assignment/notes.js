import express from 'express';

const router = express.Router();

let data = [];

router.post('/', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        res.status(400).json({
            success: false,
            message: "Title and content are required"
        })
    }
    const newNote = {
        id: data.length + 1
        , title,
        content,
        createdAt: new Date()
    }
    data.push(newNote);

    res.status(201).json({
        success: true,
        note: { title, content }
    })
})

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        notes: data
    })
});

router.get(':id', (req, res) => {
    const id = parseInt(req.params.id);
    const note = data.find(n => n.id === id);   

    res.status(200).json({
        success: true,
        note
    })
})

router.put('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    let note = data.find(n => n.id === id);
    if(!note){
        return res.status(404).json({
            success: false,            message: "Note not found"
        })
    }
    note.title = title || note.title;
    note.content = content || note.content;
    res.status(200).json({
        success: true,
        note
    })
})

router.delete('/:id',(req,res)=>{
    const id = parseInt(req.params.id);
    const index = data.findIndex(n => n.id === id);  
    if(index === -1){
        return res.status(404).json({
            success: false, 
            message: "Note not found"
        });
    }
    data.splice(index,1);
    res.status(200).json({
        success: true,
        message: "Note deleted successfully"
    })
})

export default router;