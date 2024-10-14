const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/todos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB connection error: ", err));

// Route to fetch all todos
app.get("/get", (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Route to add a new todo
app.post('/add', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: "Task is required" });
    }

    // Create a new todo
    TodoModel.create({ task })
        .then(result => res.status(201).json(result))  // Return 201 status for created resource
        .catch(err => res.status(500).json({ error: err.message }));
});

// Route to update todo 'done' status
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate(id, { done: true }, { new: true })  // Set done to true
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Route to delete a todo
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
