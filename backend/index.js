const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const { createTodo, updateTodo } = require('./types');
const { todo } = require('./db');

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.post('/todo', async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success) {
        res.status(411).json({
            msg: "You send the wrong inputs",
        })
        return;
    }

    try {
        await todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false
        });

        res.json({
            msg: "todo added successfully!"
        });
        
    } catch(err) {
        res.json({
            msg: "server down! try later!"
        });
    }
});

app.get('/todo', async (req, res) => {

    try {
        const todos = await todo.find({});

        res.json({
            todos
        });
        
    } catch(err) {
        res.json({
            msg: "server down! try later!"
        });
    }

});

app.put('/completed', async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }

    try {
        await todo.updateOne({
            _id: req.body.id
        }, {
            completed: true
        });

        res.json({
            msg: "todo marked as done!"
        });
        
    } catch(err) {
        console.log(err);
        res.json({
            msg: "server down! try later!"
        });
    }
});

app.delete('/delete', async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if(!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    
    try {
        await todo.deleteOne({
            _id: req.body.id
        });

        res.json({
            msg: 'Todo deleted successfully!'
        })
    } catch(err) {
        res.json({
            msg: 'server down! try later!'
        });
    }
});

app.listen(PORT, () => {
    console.log(`App is live on http://localhost:${PORT}`);
});