const express = require("express");
const router = express.Router();
const Todo = require("./models/todo");

// Get all todos
router.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch todos" });
    }
});

// Create a new todo
router.post("/todos", async (req, res) => {
    try {
        const task = req.body.task;
        const newTodo = new Todo({ task: task });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: "Failed to create todo" });
    }
});

// Update a todo by id
router.put("/todos/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: "Failed to update todo" });
    }
});

// Delete a todo by id
router.delete("/todos/:id", async (req, res) => {
    console.log("Delete");
    const {id} = req.params;
    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete todo" });
    }
});

module.exports = router;
